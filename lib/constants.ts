export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fprecedent.dev&demo-image=https%3A%2F%2Fprecedent.dev%2Fapi%2Fog&env=DATABASE_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example";

export const nonQuestionFields = ["Name", "Submitted At"]

export const responsesAirtableRes = {
  records: [
    {
      createdTime: "2023-02-10T15:46:16.000Z",
      id: "recaX2302Y1bEDBaQ",
      fields: {
        "First Scorer": "Miles Sanders",
        "Name": "Pranav Pillai",
        "Submitted At": "2023-02-10T15:46:16.000Z",
        "Winner": "Eagles",
      }
    },
    {
      createdTime: "2023-02-10T15:46:40.000Z",
      id: "recGXcleYCnodaN0f",
      fields: {
        "First Scorer": "Jalen Hurts",
        "Name": "Dhruv",
        "Submitted At": "2023-02-10T15:4640.000Z",
        "Winner": "Eagles",
      }
    }
  ]
}

export const answersAirtableRes = {
  records: [
    {
      createdTime: "2023-02-10T15:48:01.000Z",
      id: "rec09g5Mvu1CVFrpc",
      fields: {
        "First Scorer": "Miles Sanders"
      }
    }
  ]
}

interface StringKeyAnyValueObject {
  [key: string]: any
}

interface AirtableRecord {
  createdTime: string,
  id: string,
  fields: StringKeyAnyValueObject
}

interface AirtableRes {
  records: AirtableRecord[]
}

interface Answer {
  question: string,
  answer: any,
  answered: boolean,
  correct: boolean,
}

interface LeaderboardEntry {
  name: any,
  submitted_at: any,
  num_correct: number,
  num_answered: number,
  answers: Answer[]
}

export const getAnswersFromAirtableRes = (
  airtableRes: AirtableRes
): StringKeyAnyValueObject => {
  return airtableRes.records[0].fields
}

export const getLeaderboardEntriesFromAirtableRes = (
  responses: AirtableRes,
  correctAnswers: StringKeyAnyValueObject
): LeaderboardEntry[] => {
  return responses.records.map((record) => {
    const answerObjs = Object.entries(record.fields).filter(
      ([_key, _]) => !(nonQuestionFields.includes(_key))
    ).map(([key, value]) => {
      const answered = key in correctAnswers
      const correct = answered ? correctAnswers[key] === value : false;
      return {
        question: key,
        answer: value,
        answered,
        correct
      }
    })
  
    return {
      name: record.fields.Name,
      submitted_at: record.fields["Submitted At"],
      num_correct: answerObjs.filter((q) => q.correct).length,
      num_answered: answerObjs.filter((q) => q.answered).length,
      answers: answerObjs
    }
  }).sort((entry1, entry2) => entry2.num_correct - entry1.num_correct)
}