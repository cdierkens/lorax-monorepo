function Select(
  props: React.PropsWithChildren<React.SelectHTMLAttributes<HTMLSelectElement>>
) {
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Section({ children }: React.PropsWithChildren<{}>) {
  return <div className="mb-4">{children}</div>;
}

interface PromptFormProps {
  prompt: string;
  baseModel: string;
  adapter?: string;
  temperature: number;
  maxNewTokens: number;
  namePostFix: string;
}

export function PromptForm({
  adapter,
  baseModel,
  maxNewTokens,
  prompt,
  temperature,
  namePostFix,
}: PromptFormProps) {
  return (
    <div>
      <Section>
        <label htmlFor={`model${namePostFix}`}>Base Model</label>
        <Select
          id={`model${namePostFix}`}
          name={`model${namePostFix}`}
          defaultValue={baseModel}
        >
          <option value="llama-2-7b">llama-2-7b</option>
          <option value="mistral-7b">mistral-7b</option>
          <option value="zephyr-7b-beta">zephyr-7b-beta</option>
        </Select>
      </Section>

      <Section>
        <label htmlFor={`adapter${namePostFix}`}>Adapter</label>
        <Select
          id={`adapter${namePostFix}`}
          name={`adapter${namePostFix}`}
          defaultValue={adapter}
        >
          <option value="None">None</option>
          <option value="cnn/1">News Summarization</option>
          <option value="magicoder/1">Code Generation</option>
        </Select>
      </Section>

      <Section>
        <label
          htmlFor={`temperature${namePostFix}`}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Temperature:
        </label>
        <input
          type="number"
          id={`temperature${namePostFix}`}
          name={`temperature${namePostFix}`}
          min="0.1"
          max="1"
          step={0.1}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={temperature}
        />
      </Section>

      <Section>
        <label
          htmlFor={`max_tokens${namePostFix}`}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Max New Tokens:
        </label>
        <input
          name={`max_tokens${namePostFix}`}
          type="number"
          min="20"
          max="512"
          step={1}
          id={`max_tokens${namePostFix}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={maxNewTokens}
        />
      </Section>
    </div>
  );
}
