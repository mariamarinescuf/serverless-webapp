import React from "react";
import { useSessionStorage } from "hooks";

interface RouterConfigWidgetProps {
    setLoaderDelay: React.Dispatch<React.SetStateAction<number>>,
    loaderDelay: number, 
    setPendingMs: React.Dispatch<React.SetStateAction<number>>,  
    pendingMs: number, 
    setPendingMinMs: React.Dispatch<React.SetStateAction<number>>, 
    pendingMinMs: number
}

export const RouterConfigWidget = (props: RouterConfigWidgetProps) => {

const { setLoaderDelay,loaderDelay, setPendingMs,  pendingMs, setPendingMinMs, pendingMinMs } = props;
  return (
    <div className="text-xs fixed w-52 shadow-md shadow-black/20 rounded bottom-2 left-2 bg-white bg-opacity-75 border-b flex flex-col gap-1 flex-wrap items-left divide-y divide-gray-500/20">
      <div className="p-2 space-y-2">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white rounded p-1 px-2"
            onClick={() => {
              setLoaderDelay(150);
            }}
          >
            Fast
          </button>
          <button
            className="bg-blue-500 text-white rounded p-1 px-2"
            onClick={() => {
              setLoaderDelay(500);
            }}
          >
            Fast 3G
          </button>
          <button
            className="bg-blue-500 text-white rounded p-1 px-2"
            onClick={() => {
              setLoaderDelay(2000);
            }}
          >
            Slow 3G
          </button>
        </div>
        <div>
          <div>Loader Delay: {loaderDelay}ms</div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={loaderDelay}
            onChange={(e) => setLoaderDelay(e.target.valueAsNumber)}
            className="w-full"
          />
        </div>
      </div>
      <div className="p-2 space-y-2">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white rounded p-1 px-2"
            onClick={() => {
              setPendingMs(1000);
              setPendingMinMs(500);
            }}
          >
            Reset to Default
          </button>
        </div>
        <div>
          <div>defaultPendingMs: {pendingMs}ms</div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={pendingMs}
            onChange={(e) => setPendingMs(e.target.valueAsNumber)}
            className="w-full"
          />
        </div>
        <div>
          <div>defaultPendingMinMs: {pendingMinMs}ms</div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={pendingMinMs}
            onChange={(e) => setPendingMinMs(e.target.valueAsNumber)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
