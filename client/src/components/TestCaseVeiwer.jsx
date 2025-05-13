
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function TestCaseViewer({ cases }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full p-2 bg-gray-800 rounded">
            <span className="text-white">Test Cases ({cases.length})</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180' : ''
              } w-5 h-5 text-white`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="p-2 bg-gray-900 rounded mt-1 space-y-2">
            {cases.map((tc, i) => (
              <div key={i} className="text-white">
                <div>
                  <strong>Input:</strong> {tc.input}
                </div>
                <div>
                  <strong>Output:</strong> {tc.output}
                </div>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
