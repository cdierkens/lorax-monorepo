import { QueryStatus } from '@reduxjs/toolkit/query';
import { useReadRootGetQuery } from '../store/loraxServerApi';

export function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const prompt = searchParams.get('prompt') || 'What is your name?';

  const { data, status } = useReadRootGetQuery({
    prompt,
  });

  return (
    <div className="container mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prompt"
            name="prompt"
            defaultValue={prompt}
          />
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

      <div>
        <p className="text-gray-700 text-base">
          {status === QueryStatus.pending && 'Loading...'}
          {status === QueryStatus.rejected && 'Failed to load'}
          {status === QueryStatus.fulfilled && data?.text}
        </p>
      </div>
    </div>
  );
}

export default App;
