"use client";

import { useCall } from "@stream-io/video-react-sdk";
import { SparklesIcon, XIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

interface AIQuestionsProps {
    onClose: () => void;
}

const AIQuestions = ({ onClose }: AIQuestionsProps) => {
    const call = useCall();
    const additionalDetails = call?.state?.custom?.additionalDetails as string | undefined;

    if (!additionalDetails) {
        return (
            <div className="p-4 text-center text-muted-foreground text-sm">
                No AI questions available for this meeting.
            </div>
        );
    }

    // Parse questions (assuming they are in the "1. Question" format as generated)
    const questions = additionalDetails.split("\n").filter(q => q.trim() !== "");

    return (
        <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l">
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SparklesIcon className="size-4 text-primary" />
                    <h2 className="font-semibold text-sm">AI Questions</h2>
                </div>
                <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
                    <XIcon className="size-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {questions.map((question, index) => {
                        // Check if it's a numbered list item
                        const match = question.match(/^(\d+)\.\s*(.*)/);
                        if (match) {
                            return (
                                <div key={index} className="flex gap-3 text-sm">
                                    <span className="font-bold text-primary shrink-0">{match[1]}.</span>
                                    <p className="text-muted-foreground leading-relaxed">{match[2]}</p>
                                </div>
                            );
                        }
                        return (
                            <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                                {question}
                            </p>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};

export default AIQuestions;
