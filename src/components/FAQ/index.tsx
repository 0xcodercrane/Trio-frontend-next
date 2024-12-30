'use client';

import { useDisclosure } from '@/lib/hooks';
import { X } from 'lucide-react';
import Section from '../Section';
import TrioMarkets from '../TrioMarkets';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Dialog, DialogContent } from '../ui/dialog';

export default function FAQ() {
  const { isOpen, open, close } = useDisclosure();
  const FAQS = [
    {
      title: 'What is TRIO?',
      question: 'What is TRIO?',
      answer:
        'TRIO is the utility token of the OrdinalsBot and TRIO ecosystem. It is used to opt in to exclusive mints, featured, and rewards.'
    },
    {
      title: 'Where can I buy TRIO?',
      question: 'Where can I buy TRIO?',
      answer: (
        <>
          <p className='mb-3'>
            TRIO is available on{' '}
            <span className='text-ob-green hover:cursor-pointer hover:font-bold hover:text-ob-green-light' onClick={open}>
              these exchanges:
            </span>
          </p>
        </>
      )
    },
    {
      title: 'Why is my XP Mining Trio balance different from my actual TRIO balance?',
      question: 'Why is my XP Mining Trio balance different from my actual TRIO balance?',
      answer:
        'We update your XP Mining Trio balance once every 144 blocks (approximately 24 hours). Your XP Mining Trio balance, or "synthetic balance" is defined as the smallest amount of TRIO held during that 144 block duration. Therefore, you can currently be holding 1000 TRIO, but if you held any less than 1000 TRIO during the last 144 blocks (cycle), then your XP Mining Trio balance will be the lesser of the two numbers.'
    },
    {
      title: 'What are Points (XP)?',
      question: 'What are Points (XP)?',
      answer:
        'Points are a system for incentivizing and rewarding users for various participatory actions in the OrdinalsBot ecosystem. XP is the unit.'
    },
    {
      title: 'What is XP Mining?',
      question: 'What is XP Mining?',
      answer: 'XP Mining is the first "staking-like" protocol built into a BRC20 token.'
    },
    {
      title: 'How does XP Mining work?',
      question: 'How does XP Mining work?',
      answer:
        'Our XP Mining protocol rewards users every 144 blocks with XP, based on the amount of TRIO that a wallet is holding. The smallest balance over that 144 period is used to determine the amount of XP to reward. This "smallest" balance is known as the "Synthetic Balance" of the user.'
    },
    {
      title: 'How does the referral system work?',
      question: 'How does the referral system work?',
      answer:
        'Both the referred and the referrer receive points when the referred signs up and completes the "Follow Twitter" task.'
    },
    {
      title: 'Can the TRIO launch app be exploited?',
      question: 'Can the TRIO launch app be exploited?',
      answer:
        'Nothing is impervious. But, we have taken steps to monitor possible bot/spam attacks on the ecosystem. If we catch you creating many accounts to game the system, we will ban your account and your wallets from our system. Yes, we know this will no stop you entirely, but it will slow you down. At the end of the day, this is a game, and everyone has more fun when games are played fairly.'
    },
    {
      title: 'What are Reward Pools?',
      question: 'What are Reward Pools?',
      answer:
        'Reward Pools are a way to spend XP. Pools are populated with prizes, such as NFTs, Bitcoin, or other runes & tokens. Pools payout at a target date, and proportionally to the amount of XP that a user has.'
    },
    {
      title: 'Will the XP / Day / TRIO ratio change?',
      question: 'Will the XP / Day / TRIO ratio change?',
      answer:
        'OrdinalsBot reserves the right to set and change the XP / Day / TRIO ratio at any time. We will change this ratio based on the needs of the ecosystem.'
    }
  ];
  return (
    <Section>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='col-span-1 mb-8 flex items-center justify-center md:mb-0'>
          <h2 className='text-2xl md:text-6xl'>Frequently Asked Questions</h2>
        </div>

        <Accordion type='single' collapsible className='col-span-1 flex w-full flex-col gap-4 md:w-[75%]'>
          {FAQS.map(({ answer, title }, index) => (
            <AccordionItem value={`faq-${index}`} className='rounded-lg bg-ob-purple-dark p-3' key={index}>
              <AccordionTrigger className='flex flex-row justify-between px-2 py-1 text-left text-lg font-bold'>
                {title}
              </AccordionTrigger>
              <AccordionContent className='px-2 py-2 text-white opacity-80'>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Dialog open={isOpen}>
        <DialogContent className='w-full max-w-[80%] md:max-w-[33%]'>
          <div className='flex flex-col items-center justify-center gap-6 py-1 text-center'>
            <div
              onClick={close}
              className='absolute right-2 top-2 z-20 flex h-[24px] w-[24px] items-center justify-center rounded-full hover:cursor-pointer hover:opacity-60'
            >
              <X size={16} className='text-white/80' />
            </div>
            <h4 className='font-xl font-bold'>You can buy TRIO from any of these places:</h4>
            <TrioMarkets />
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
