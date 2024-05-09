import { QueryStatus } from '@reduxjs/toolkit/query';
import { useReadRootGetQuery } from '../store/loraxServerApi';
import { PromptForm } from '../components/prompt-form';
import { useState } from 'react';

function usePromptOptions() {
  const searchParams = new URLSearchParams(window.location.search);

  const prompt = searchParams.get(`prompt`) || 'What is your name?';

  const promptOptionsA = getPromptOptions('A');
  const promptOptionsB = getPromptOptions('B');

  return useState({
    prompt,
    promptOptionsA,
    promptOptionsB,
  });
}

function getPromptOptions(postfix: string) {
  const searchParams = new URLSearchParams(window.location.search);

  const baseModel = searchParams.get(`model${postfix}`) || 'mistral-7b';
  const adapter = searchParams.get(`adapter${postfix}`) || undefined;

  const temperature = searchParams.has('temperature')
    ? parseFloat(searchParams.get(`temperature${postfix}`)!)
    : 0.1;
  const maxNewTokens = searchParams.has('max_tokens')
    ? parseFloat(searchParams.get(`max_tokens${postfix}`)!)
    : 20;

  return {
    baseModel,
    adapter,
    temperature,
    maxNewTokens,
  };
}

export function App() {
  const [{ prompt, promptOptionsA, promptOptionsB }, setPromptOptions] =
    usePromptOptions();

  const { data, status } = useReadRootGetQuery({
    prompt,
    baseModelA: promptOptionsA.baseModel,
    adapterA: promptOptionsA.adapter as string,
    temperatureA: promptOptionsA.temperature,
    maxNewTokensA: promptOptionsA.maxNewTokens,
    baseModelB: promptOptionsB.baseModel,
    adapterB: promptOptionsB.adapter as string,
    temperatureB: promptOptionsB.temperature,
    maxNewTokensB: promptOptionsB.maxNewTokens,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    /**
     * Note: The app works without the submit handler. Adding the submit handler
     * allows the request to be made without reloading the whole page.
     */

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // Note: The FormData object has the right shape to be converted to query
    // parameters. This is essentially a TLDR of what a router like react-router
    // does for you.
    const searchParams = new URLSearchParams(formData as any);
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    /**
     * TODO: I wouldn't SHIP all these type assertions. Instead I would parse the
     * values against a schema and then use the parsed values. This would give a path
     * to ensure the values match the correct types and also provide a way to give
     * error messages to the user if they enter the wrong type.
     *
     * You could also share those schemas between the frontend and the backend to ensure
     * that the values are always correct.
     */
    const prompt = formData.get('prompt') as string;
    const promptOptionsA = {
      baseModel: formData.get('modelA') as string,
      adapter: formData.get('adapterA') as string,
      temperature: parseFloat(formData.get('temperatureA') as string),
      maxNewTokens: parseInt(formData.get('max_tokensA') as string, 10),
    };

    const promptOptionsB = {
      baseModel: formData.get('modelB') as string,
      adapter: formData.get('adapterB') as string,
      temperature: parseFloat(formData.get('temperatureB') as string),
      maxNewTokens: parseInt(formData.get('max_tokensB') as string, 10),
    };

    // NOTE: We don't care about storing these large objects in react state because
    // our query library will handle serializing and skipping the request if the
    // values haven't changed.
    setPromptOptions({ prompt, promptOptionsA, promptOptionsB });
  }

  return (
    <div className="container mx-auto py-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={`prompt`}
          >
            Prompt
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`prompt`}
            name="prompt"
            defaultValue={prompt}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="basis-1/2">
            <PromptForm
              adapter={promptOptionsA.adapter}
              baseModel={promptOptionsA.baseModel}
              maxNewTokens={promptOptionsA.maxNewTokens}
              prompt={prompt}
              temperature={promptOptionsA.temperature}
              namePostFix="A"
            />
            <div>
              {status === QueryStatus.fulfilled && data?.textA}
              {status === QueryStatus.pending && 'Loading...'}
              {status === QueryStatus.rejected && 'Failed to load'}
            </div>
          </div>

          <div className="basis-1/2">
            <PromptForm
              adapter={promptOptionsB.adapter}
              baseModel={promptOptionsB.baseModel}
              maxNewTokens={promptOptionsB.maxNewTokens}
              prompt={prompt}
              temperature={promptOptionsB.temperature}
              namePostFix="B"
            />

            <div>
              {status === QueryStatus.fulfilled && data?.textB}
              {status === QueryStatus.pending && 'Loading...'}
              {status === QueryStatus.rejected && 'Failed to load'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
