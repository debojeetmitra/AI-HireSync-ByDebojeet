"use client";

import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import Image from "next/image";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Editor from "@monaco-editor/react";


function CodeEditor() {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<
    "javascript" | "python" | "java"
  >(LANGUAGES[0].id);
  const [code, setCode] = useState(
    selectedQuestion.starterCode[language]
  );

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (
    newLanguage: "javascript" | "python" | "java"
  ) => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* QUESTION HEADER - compact top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border-b bg-background/95">
        <div>
          <h2 className="text-lg font-semibold">
            {selectedQuestion.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            Choose your language and solve the problem
          </p>
        </div>

        <div className="flex gap-3">
          {/* QUESTION SELECT */}
          <Select
            value={selectedQuestion.id}
            onValueChange={handleQuestionChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select question" />
            </SelectTrigger>
            <SelectContent>
              {CODING_QUESTIONS.map((q) => (
                <SelectItem key={q.id} value={q.id}>
                  {q.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* LANGUAGE SELECT */}
          <Select
            value={language}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <Image
                    src={LANGUAGES.find((l) => l.id === language)?.icon || ""}
                    alt={language}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {LANGUAGES.find((l) => l.id === language)?.name}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    {lang.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* RESIZABLE: Problem Description + Code Editor */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup orientation="vertical" className="h-full">
          {/* PROBLEM DESCRIPTION PANEL */}
          <ResizablePanel defaultSize={35} minSize={15}>
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="text-yellow-500">📋</span> Problem Description
                  </h3>
                  {selectedQuestion.description.split("\n").map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>

                {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
                  <div className="rounded-lg border bg-card p-4 space-y-3">
                    <h3 className="font-semibold">Examples</h3>
                    {selectedQuestion.examples.map((example, i) => (
                      <div key={i} className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground font-medium">Input:</span> <code className="bg-muted px-1 rounded">{example.input}</code></p>
                        <p><span className="text-muted-foreground font-medium">Output:</span> <code className="bg-muted px-1 rounded">{example.output}</code></p>
                        {example.explanation && (
                          <p className="text-muted-foreground text-xs italic">💡 {example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {selectedQuestion.constraints && selectedQuestion.constraints.length > 0 && (
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                    <h3 className="font-semibold">Constraints</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      {selectedQuestion.constraints.map((constraint, i) => (
                        <li key={i}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* CODE EDITOR PANEL */}
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="h-full relative">
              <Editor
                height={"100%"}
                defaultLanguage={language}
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 18,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                  wordWrap: "on",
                  wrappingIndent: "indent",
                }}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default CodeEditor;
