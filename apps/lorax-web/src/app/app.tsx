import { useReadRootGetQuery } from '../store/loraxServerApi';

export function App() {
  const { data, status } = useReadRootGetQuery({
    prompt: 'What is your name?',
  });

  return (
    <div>
      {status}

      {data && data.text}
    </div>
  );
}

export default App;
