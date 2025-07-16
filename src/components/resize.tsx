import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  import { MyCharteu } from "./chart-ue";
  import { Button } from "./ui/button";
  
  export default function Resize() {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="relative h-screen">
            {/* Left Panel Content */}
            <div className="absolute inset-0 z-10 bg-gray-100 overflow-auto">
              <div className="grid grid-cols-4 min-w-7xl mt-20">
                <section className="col-span-1 border-r">
                  <div className="w-full py-16 md:py-5">
                    <div className="grid px-10 gap-6">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-left rounded-sm bg-gray-200 px-6 py-4"
                        >
                          <div className="mr-6 flex h-14 w-14 flex-none items-center justify-center rounded-sm bg-white">
                            <p className="text-sm font-bold sm:text-xl">
                              {index + 1}
                            </p>
                          </div>
                          <p className="text-sm sm:text-base">Item {index + 1}</p>
                        </div>
                      ))}
                      <Button>All…</Button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="relative h-screen">
            {/* Right Panel Content */}
            <div className="absolute inset-0 z-0 bg-white overflow-auto">
              <div className="grid grid-cols-4 mt-20">
                <section className="col-span-1 border-r">
                  <div className="w-full py-16 md:py-5">
                    <div className="grid px-10 gap-6">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-left rounded-sm bg-gray-200 px-6 py-4"
                        >
                          <div className="mr-6 flex h-14 w-14 flex-none items-center justify-center rounded-sm bg-white">
                            <p className="text-sm font-bold sm:text-xl">
                              {index + 1}
                            </p>
                          </div>
                          <p className="text-sm sm:text-base">Item {index + 1}</p>
                        </div>
                      ))}
                      <Button>All…</Button>
                    </div>
                  </div>
                </section>
                <div className="col-span-3 grid grid-rows-1">
                  <div>Hello</div>
                  <MyCharteu />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  