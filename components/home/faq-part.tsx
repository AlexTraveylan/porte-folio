import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScopedI18n } from "@/locales/client"
import React from "react"

type questionPossibilities =
  | "question1"
  | "question2"
  | "question3"
  | "question4"
  | "question5"

type answerPossibilities =
  | "answer1"
  | "answer2"
  | "answer3"
  | "answer4"
  | "answer5"

type FAQData = {
  questionI18n: questionPossibilities
  answerI18n: answerPossibilities
}

const faqData: FAQData[] = [
  {
    questionI18n: "question1",
    answerI18n: "answer1",
  },
  {
    questionI18n: "question2",
    answerI18n: "answer2",
  },
  {
    questionI18n: "question3",
    answerI18n: "answer3",
  },
  {
    questionI18n: "question4",
    answerI18n: "answer4",
  },
  {
    questionI18n: "question5",
    answerI18n: "answer5",
  },
]

const FAQPart: React.FC = () => {
  const scopedT = useScopedI18n("faq")

  return (
    <>
      <h2 id="faq" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("title")}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
            <AccordionTrigger className="text-md font-medium">
              {scopedT(item.questionI18n)}
            </AccordionTrigger>
            <AccordionContent>{scopedT(item.answerI18n)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default FAQPart
