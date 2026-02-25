"use client";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, SparklesIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "./ui/resizable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";
import AIQuestions from "./AIQuestions";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showAIQuestions, setShowAIQuestions] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      router.push("/");
    }
  }, [callingState, router]);

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)]">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={35}>
          {/* VIDEO LAYOUT */}
          <div className="relative h-full">
            <div className="absolute inset-0">
              {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

              {showParticipants && (
                <div className="absolute right-0 top-0 h-full w-[300px] z-50">
                  <CallParticipantsList
                    onClose={() => setShowParticipants(false)}
                  />
                </div>
              )}

              {showAIQuestions && (
                <div className="absolute right-0 top-0 h-full w-[400px] z-50">
                  <AIQuestions onClose={() => setShowAIQuestions(false)} />
                </div>
              )}
            </div>

            {/* VIDEO CONTROLS */}
            <div className="absolute bottom-4 left-0 right-0 z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                  <CallControls onLeave={() => router.push("/")} />

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="size-10">
                          <LayoutListIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setLayout("grid")}>
                          Grid View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayout("speaker")}>
                          Speaker View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      variant="outline"
                      size="icon"
                      className="size-10"
                      onClick={() => {
                        setShowParticipants(!showParticipants);
                        setShowAIQuestions(false);
                      }}
                    >
                      <UsersIcon className="size-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="size-10"
                      onClick={() => {
                        setShowAIQuestions(!showAIQuestions);
                        setShowParticipants(false);
                      }}
                    >
                      <SparklesIcon className="size-4" />
                    </Button>

                    <EndCallButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default MeetingRoom;
