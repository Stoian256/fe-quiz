import {
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { Filters } from "../utils/interfaces/Filters";

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORECTNESS ACCURACY",
  "ACTIONS"
];

const questionsData = [
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  }
];

interface Question {
  question: string;
  difficultyLevel: string;
  tags: string[];
  usedInQuizzes: number;
  correctnessAccuracy: number;
}
type PropsType = {
  filters: Filters;
};

const DisplayQuestions = ({ filters }: PropsType) => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numbersOfPages, setNumbersOfPages] = useState(
    Math.ceil(questionsData.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
  );

  useEffect(() => {
    setNumbersOfPages(Math.ceil(questionsData.length / itemsPerPage));
    setQuestions(questionsData);
    const lastIndex = pageNumber * itemsPerPage;
    const startingIndex = lastIndex - itemsPerPage;

    setQuestions((prevQuestions) =>
      prevQuestions.slice(startingIndex, lastIndex)
    );
  }, [numbersOfPages, pageNumber, itemsPerPage, filters]);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      if (pageNumber === 1) {
        return;
      }
      setPageNumber((prevPage) => prevPage - 1);
    }
    if (direction === "right") {
      if (pageNumber === numbersOfPages) {
        return;
      }
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const handleItemsPerPage = (e: SetStateAction<string>) => {
    setItemsPerPage(Number(e));
    setPageNumber(1);
  };

  return (
    <div className="pb-5 w-full">
      <Table>
        <TableHeader className="bg-gray-200 text-black border-b-2 border-black">
          <TableRow>
            {tableHeadData.map((head, index) => (
              <TableHead key={index} className="text-black">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((eachQuestion, index) => {
            const {
              question,
              tags,
              difficultyLevel,
              usedInQuizzes,
              correctnessAccuracy
            } = eachQuestion;
            return (
              <TableRow key={index} className="h-[30px] text-left">
                <TableCell className="font-medium  w-[480px]">
                  {question.length > 60 ? (
                    <TooltipProvider delayDuration={200} key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          {`${question.slice(0, 60)}...`}
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-5/12 ml-10">
                          {question}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    question
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      difficultyLevel === "Easy"
                        ? "bg-green-600"
                        : difficultyLevel === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }
                  >
                    {difficultyLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tags.map((tag, index) => (
                    <Badge key={index} className="mr-1 mb-1">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{usedInQuizzes}</TableCell>
                <TableCell>
                  {correctnessAccuracy}%
                  <Progress
                    value={correctnessAccuracy}
                    className="h-1 w-6/12 ml-2 mb-0.5 inline-block"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      className="border-black hover:bg-black hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      // onClick={(e) => handleDelete(e)}
                      value={index}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mt-3">
          <ChevronsLeft
            onClick={() => setPageNumber(1)}
            className={
              pageNumber === 1 ? "invert cursor-not-allowed" : "cursor-pointer"
            }
          />
          <ChevronLeft
            onClick={() => handleArrowClick("left")}
            className={
              pageNumber === 1 ? "invert cursor-not-allowed" : "cursor-pointer"
            }
          />

          {[...Array(numbersOfPages)].map((_page, index) => {
            const defaultPageIndexes = [
              0,
              1,
              2,
              numbersOfPages - 1,
              numbersOfPages - 2,
              numbersOfPages - 3,
              pageNumber - 4,
              pageNumber - 3,
              pageNumber - 2,
              pageNumber - 1,
              pageNumber,
              pageNumber + 1,
              pageNumber + 2
            ];
            if (defaultPageIndexes.includes(index)) {
              if ((pageNumber > 7 || pageNumber === 1) && index === 2) {
                return (
                  <div key={index}>
                    <Button
                      variant="outline"
                      className={
                        pageNumber === index + 1
                          ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                          : ""
                      }
                      name={(index + 1).toString()}
                      onClick={(e) =>
                        setPageNumber(Number(e.currentTarget.name))
                      }
                    >
                      {index + 1}
                    </Button>
                    <span className="tracking-widest w-6">...</span>
                  </div>
                );
              }

              if (
                index === numbersOfPages - 3 &&
                pageNumber < numbersOfPages - 6
              ) {
                return (
                  <div key={index}>
                    <span className="tracking-widest w-6">...</span>
                    <Button
                      variant="outline"
                      className={
                        pageNumber === index + 1
                          ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                          : ""
                      }
                      key={index}
                      name={(index + 1).toString()}
                      onClick={(e) =>
                        setPageNumber(Number(e.currentTarget.name))
                      }
                    >
                      {index + 1}
                    </Button>
                  </div>
                );
              }

              if (pageNumber === 1 && index === 3) {
                return;
              }
              return (
                <Button
                  variant="outline"
                  className={
                    pageNumber === index + 1
                      ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                      : ""
                  }
                  key={index}
                  name={(index + 1).toString()}
                  onClick={(e) => setPageNumber(Number(e.currentTarget.name))}
                >
                  {index + 1}
                </Button>
              );
            }
          })}

          <ChevronRight
            onClick={() => handleArrowClick("right")}
            className={
              pageNumber === numbersOfPages
                ? "invert cursor-not-allowed"
                : "cursor-pointer"
            }
          />
          <ChevronsRight
            onClick={() => setPageNumber(numbersOfPages)}
            className={
              pageNumber === numbersOfPages
                ? "invert cursor-not-allowed"
                : "cursor-pointer"
            }
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p>Items per Page</p>
          <Select
            defaultValue="10"
            value={String(itemsPerPage)}
            onValueChange={(e) => handleItemsPerPage(e)}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuestions;
