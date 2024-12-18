// @ts-nocheck
// WARN: Type-unsafe, ported from backend repo.
// Credits to https://github.com/jlopp/bitcoin-transaction-size-calculator

const P2PKH_IN_SIZE = 148;
const P2PKH_OUT_SIZE = 34;

const P2SH_OUT_SIZE = 32;

// All segwit input sizes are reduced by 1 WU to account for the witness item counts being added for every input per the transaction header
const P2SH_P2WPKH_IN_SIZE = 90.75;

const P2WPKH_IN_SIZE = 67.75;

const P2WSH_OUT_SIZE = 43;
const P2TR_OUT_SIZE = 43;

const P2TR_IN_SIZE = 57.25;

const PUBKEY_SIZE = 33;
const SIGNATURE_SIZE = 72;

const getTxOverheadExtraRawBytes = (inputScript, inputCount) => {
  let witnessBytes = 0;
  // Returns the remaining 3/4 bytes per witness bytes
  if (inputScript === 'P2PKH' || inputScript === 'P2SH') {
    witnessBytes = 0;
  } else {
    // Transactions with segwit inputs have extra overhead
    witnessBytes =
      0.25 + // segwit marker
      0.25 + // segwit flag
      inputCount / 4; // witness element count per input
  }

  return witnessBytes * 3;
};

const getSizeOfVarInt = (length) => {
  if (length < 253) {
    return 1;
  }
  if (length < 65535) {
    return 3;
  }
  if (length < 4294967295) {
    return 5;
  }
  if (length < 18446744073709551615) {
    return 9;
  }

  throw new Error('invalid len');
};

const getSizeOfScriptLengthElement = (length) => {
  if (length < 75) {
    return 1;
  }
  if (length <= 255) {
    return 2;
  }
  if (length <= 65535) {
    return 3;
  }
  if (length <= 4294967295) {
    return 5;
  }

  throw new Error('Size of redeem script is too large');
};

const getTxOverheadVBytes = (inputScript, inputCount, outputCount) => {
  let witnessVbytes = 0;
  if (inputScript === 'P2PKH' || inputScript === 'P2SH') {
    witnessVbytes = 0;
  } else {
    // Transactions with segwit inputs have extra overhead
    witnessVbytes =
      0.25 + // segwit marker
      0.25 + // segwit flag
      inputCount / 4; // witness element count per input
  }

  return (
    4 + // nVersion
    getSizeOfVarInt(inputCount) + // number of inputs
    getSizeOfVarInt(outputCount) + // number of outputs
    4 + // nLockTime
    witnessVbytes
  );
};

const getInputAndWitnessSize = (inputScript) => {
  let inputWitnessSize = 0;
  let inputSize = 0;

  if (inputScript === 'P2PKH') {
    inputSize = P2PKH_IN_SIZE;
  } else if (inputScript === 'P2SH-P2WPKH' || inputScript === 'P2WPKH') {
    inputSize = inputScript === 'P2SH-P2WPKH' ? P2SH_P2WPKH_IN_SIZE : P2WPKH_IN_SIZE;
    inputWitnessSize = 107; // size(signature) + signature + size(pubkey) + pubkey
  } else if (inputScript === 'P2TR') {
    inputSize = P2TR_IN_SIZE;
    inputWitnessSize = 65; // getSizeOfVarInt(schnorrSignature) + schnorrSignature;
  } else if (inputScript === 'P2SH') {
    const redeemScriptSize =
      1 + // OP_M
      1 * (1 + PUBKEY_SIZE) + // OP_PUSH33 <pubkey>
      1 + // OP_N
      1; // OP_CHECKMULTISIG
    const scriptSigSize =
      1 + // size(0)
      1 * (1 + SIGNATURE_SIZE) + // size(SIGNATURE_SIZE) + signature
      getSizeOfScriptLengthElement(redeemScriptSize) +
      redeemScriptSize;
    inputSize = 32 + 4 + getSizeOfVarInt(scriptSigSize) + scriptSigSize + 4;
  } else if (inputScript === 'P2SH-P2WSH' || inputScript === 'P2WSH') {
    const redeemScriptSize =
      1 + // OP_M
      1 * (1 + PUBKEY_SIZE) + // OP_PUSH33 <pubkey>
      1 + // OP_N
      1; // OP_CHECKMULTISIG
    inputWitnessSize =
      1 + // size(0)
      1 * (1 + SIGNATURE_SIZE) + // size(SIGNATURE_SIZE) + signature
      getSizeOfScriptLengthElement(redeemScriptSize) +
      redeemScriptSize;
    inputSize =
      36 + // outpoint (spent UTXO ID)
      inputWitnessSize / 4 + // witness program
      4; // nSequence
    if (inputScript === 'P2SH-P2WSH') {
      inputSize += 32 + 3; // P2SH wrapper (redeemscript hash) + overhead?
    }
  }

  return {
    inputWitnessSize,
    inputSize
  };
};

/**
 * Get the out script size
 * @param {string} outputScript - the out script
 * @returns {number} - the size
 */
const getOutputScriptSize = (outputScript) => {
  if (outputScript === 'P2PKH') {
    return P2PKH_OUT_SIZE;
  }

  if (outputScript.includes('P2SH')) {
    return P2SH_OUT_SIZE;
  }

  if (outputScript === 'P2TR') {
    return P2TR_OUT_SIZE;
  }

  if (outputScript === 'P2WSH') {
    return P2WSH_OUT_SIZE;
  }

  return 0;
};

/**
 * Calc tx vbytes
 * @param {number} inputsCount - ins
 * @param {number} outputsCount - outs
 * @param {string} inputScript - script
 * @param {string} outputScript - script
 * @returns {{txVBytes:number, inputWitnessSize: number}} - the tx vbytes and witness size
 */
const calculateTxVBytes = (inputsCount, outputsCount, inputScript = 'P2TR', outputScript = 'P2TR') => {
  const txVbytesOverhead = getTxOverheadVBytes(inputScript, inputsCount, outputsCount);
  const { inputWitnessSize, inputSize } = getInputAndWitnessSize(inputScript);
  const outScriptSize = getOutputScriptSize(outputScript);
  const txVBytes = Math.ceil(txVbytesOverhead + inputSize * inputsCount + outputsCount * outScriptSize);
  return {
    txVBytes,
    inputWitnessSize
  };
};

/**
 * Calc tx size
 * @param {number} inputsCount - ins
 * @param {number} outputsCount - outs
 * @param {string} inputScript - script
 * @param {string} outputScript - script
 * @returns {number} - the tx fee
 */
const calculateTxSize = (inputsCount, outputsCount, inputScript = 'P2TR', outputScript = 'P2TR') => {
  const { txVBytes, inputWitnessSize } = calculateTxVBytes(inputsCount, outputsCount, inputScript, outputScript);

  const extra = getTxOverheadExtraRawBytes(inputScript, inputsCount);

  return extra + txVBytes + inputWitnessSize * inputsCount * (3 / 4);
};

/**
 * Calc tx fees
 * @param {number} inputsCount - ins
 * @param {number} outputsCount - outs
 * @param {number} feePerByte  - fee
 * @param {string} inputScript - script
 * @param {string} outputScript - script
 * @param {Buffer} opReturn - op return
 * @returns {number} - the tx fee
 */
const calculateTxFees = (
  inputsCount,
  outputsCount,
  feePerByte,
  inputScript = 'P2TR',
  outputScript = 'P2TR',
  opReturn = null
) => {
  let { txVBytes } = calculateTxVBytes(inputsCount, outputsCount, inputScript, outputScript);

  if (opReturn) {
    txVBytes += opReturn.length;
  }

  return Math.ceil(txVBytes * feePerByte);
};

/**
 * Sanity checks for tx fees
 * @param {number} totalFilesSize - the size of all files combined
 * @param {number} inscriptionsCount - how many inscriptions we will make
 * @param {number} feePerByte - the selected fee
 */
const txFeeSanityChecks = (totalFilesSize, inscriptionsCount, feePerByte) => {
  if (totalFilesSize < 0) {
    throw new Error('size is negative');
  }

  if (inscriptionsCount < 0) {
    throw new Error('count is negative');
  }

  if (feePerByte < 0) {
    throw new Error('fee is negative');
  }
};

/**
 * Calculates the chain fee for multiple inscriptions
 * @param {number} totalFilesSize - the size of all files combined
 * @param {number} inscriptionsCount - how many inscriptions we will make
 * @param {number} feePerByte - the selected fee
 * @param {number} envelopeSize - the ordinals overhead
 * @param {string} batchMode - the batch mode
 * @returns {number} the chain fee
 */
const calculateInscriptionTransactionFees = (
  totalFilesSize,
  inscriptionsCount,
  feePerByte,
  envelopeSize = 100,
  batchMode = null
) => {
  txFeeSanityChecks(totalFilesSize, inscriptionsCount, feePerByte);

  // The fee for the files + inscription overhead
  const chainFeeFiles = Math.ceil((feePerByte * (totalFilesSize + envelopeSize)) / 4);

  // 1 commit tx is used for batch inscriptions including rune-etch
  const commitTxCount = batchMode ? 1 : inscriptionsCount;

  // Calculate the fees of a regular tx and add it the the file fee
  // that is our tx overhead'
  // most of our commit txs are 2 inputs 3 outputs
  // https://mempool.space/tx/b6035a268634053698857406bcc98c5216217a006de2560cd2ca572b0a9718d8
  const commitTxFees = calculateTxFees(2, 3, feePerByte) * commitTxCount;

  // we also do 1 reveal tx per inscription that actually has the file data in its witness data field
  // https://mempool.space/tx/23546e096dd165845f9242315ef8b3257f83337f614f0159a44b47f174c0ca7d#vin=0
  let revealTxFees = calculateTxFees(1, 1, feePerByte) * inscriptionsCount;

  // multiple outputs in 1 reveal tx
  if (batchMode === 'separate-outputs') {
    revealTxFees = calculateTxFees(1, inscriptionsCount, feePerByte) * 1;
  }

  // single output in 1 reveal tx separated by postage
  if (batchMode === 'shared-output') {
    revealTxFees = calculateTxFees(1, 1, feePerByte) * 1;
  }

  return commitTxFees + revealTxFees + chainFeeFiles;
};

/**
 * Calculates the chain fee for multiple inscriptions
 * @param {number} totalFilesSize - the size of all files combined
 * @param {number} inscriptionsCount - how many inscriptions we will make
 * @param {number} feePerByte - the selected fee
 * @param {number} envelopeSize - the ordinals overhead
 * @param {number} parentsCount - count of multi-parents
 * @returns {number} the chain fee
 */
const calculateDirectInscriptionTransactionFees = (
  totalFilesSize,
  inscriptionsCount,
  feePerByte,
  envelopeSize = 100,
  parentsCount = 0
) => {
  txFeeSanityChecks(totalFilesSize, inscriptionsCount, feePerByte);

  // The fee for the files + inscription overhead
  const extraBytes = 34 * parentsCount * inscriptionsCount; // 32 bytes for the outpoint and 1 bytes for the index and 1 byte for the opcode
  const chainFeeFiles = Math.ceil((feePerByte * (totalFilesSize + envelopeSize + extraBytes)) / 4);

  // reveal tx should be 1 input and number of inscriptions as output + 1 for the service fee
  // reveal tx with parent should be length of parent inscription as input + 1 funding input and number of inscriptions as output + length of parents for return parent inscription + 1 for the service fee
  const outputsCount = inscriptionsCount + parentsCount + 1;

  const revealTxFees = calculateTxFees(parentsCount + 1, outputsCount, feePerByte);

  return revealTxFees + chainFeeFiles;
};

const calculateRuneEtchingTransactionFees = (feePerByte, opReturnData) => {
  // TODO: Need to add commitment tx fees as well as soon as the details on that become clear

  // Two oputputs
  const { txVBytes } = calculateTxVBytes(2, 2, 'P2TR', 'P2TR');

  // Op return data
  const dataLength = Buffer.from(opReturnData, 'utf8').length;
  const opReturnSize = 1 + getSizeOfVarInt(dataLength) + dataLength;
  const txSize = txVBytes + opReturnSize;

  return Math.ceil(txSize * feePerByte);
};
export {
  calculateTxSize,
  calculateTxFees,
  calculateTxVBytes,
  calculateInscriptionTransactionFees,
  calculateDirectInscriptionTransactionFees,
  calculateRuneEtchingTransactionFees
};
