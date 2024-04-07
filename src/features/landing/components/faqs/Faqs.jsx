import React from 'react'
import "./faqs.css"
import FaqList from './components/FaqList';
import { shape, union } from '../..';

const Faqs = () => {
    const faqs = [
      {
        question: "How Do I Create an Account?",
        answer: 'FAQ stands for Frequently Asked Questions.',
      },
      {
        question: "What Are Societies, and How Do They Work?",
        answer: 'To create a FAQ, simply identify the most common questions that users may have and then write clear and concise answers to those questions.',
      },
      {
        question: "What If I Forget My Password?",
        answer: 'To create a FAQ, simply identify the most common questions that users may have and then write clear and concise answers to those questions.',
      },
      {
        question: "What Are the Platform Rules?",
        answer: 'FAQ stands for Frequently Asked Questions.',
      },
      {
        question: "How Can I Provide Feedback or Contact Support?",
        answer: 'FAQs can help to answer common questions that users may have, which can save time and effort for both the user and the website owner.',
      },
      {
        question: "Is My Information Kept Confidential?",
        answer: 'To create a FAQ, simply identify the most common questions that users may have and then write clear and concise answers to those questions.',
      },
      {
        question: "Can I Change My Username?",
        answer: 'FAQ stands for Frequently Asked Questions.',
      },
      {
        question: "How Can I Propose a New Society?",
        answer: 'FAQs can help to answer common questions that users may have, which can save time and effort for both the user and the website owner.',
      },
      {
        question: "Is the Platform Accessible on Mobile Devices?",
        answer: 'To create a FAQ, simply identify the most common questions that users may have and then write clear and concise answers to those questions.',
      },
      {
        question: "What If I Want to Become a Confidante?",
        answer: 'To create a FAQ, simply identify the most common questions that users may have and then write clear and concise answers to those questions.',
      },
    ];

  return (
    <section className="faq-section" id="a">
      <div className="faq-bg-icons">
        <img src={union} className="faq-icon" alt="union-svg" />
        <img src={shape} className="faq-icon" alt="union-svg" />
      </div>

      <div className="faq-wrapper">
        <div className="faq-title-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <small className="faq-text">Got questions? We have answers.</small>
        </div>
      </div>

      <ul className="faq-list">
        {
          faqs.map((faq, index) => {
            return <FaqList key={index} question={faq.question}  answer={faq.answer} />
          })
        }
      </ul>
    </section>
  )
}

export default Faqs
