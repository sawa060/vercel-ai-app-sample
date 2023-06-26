import Image from 'next/image';
import {Inter} from 'next/font/google';
import {useEffect, useId, useState} from 'react';
import {useCompletion} from 'ai/react';
import {BaseInput} from 'src/parts/input';

const inter = Inter({subsets: ['latin']});

export const Top = () => {
  const japaneseId = useId();
  const englishId = useId();
  const vietnameseId = useId();

  const [lang, setLang] = useState('English');
  const [jaValue, setJaValue] = useState('');
  const [enValue, setEnValue] = useState('');
  const [viValue, setViValue] = useState('');

  const {completion, complete, isLoading} = useCompletion({
    onResponse: (_res) => {
      setEnValue(completion);
    },
  });

  useEffect(() => {
    if (lang === 'English') {
      setEnValue(completion);
    }
    if (lang === 'Vietnamese') {
      setViValue(completion);
    }
  }, [completion]);

  function handleChangeLang(e: React.ChangeEvent<HTMLSelectElement>) {
    setLang(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const prompt = `Please translate the following words into ${lang}.

    「${jaValue}」`;

    complete(prompt);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <div className="pb-4">
          <p>OPENAI API</p>
        </div>
        <div className="pb-4">
          <label>Select language: </label>
          <select value={lang} onChange={handleChangeLang} className="text-black w-40">
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 pb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="japaneseId">
                日本語
              </label>
              <BaseInput
                id={japaneseId}
                value={jaValue}
                onChange={(e) => setJaValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="englishId">
                English
              </label>
              <BaseInput
                id={englishId}
                value={enValue}
                onChange={(e) => setEnValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vietnameseId">
                Vietnamese
              </label>
              <BaseInput
                id={vietnameseId}
                value={viValue}
                onChange={(e) => setViValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4  items-center">
            {isLoading ? (
              <div className="flex justify-center" aria-label="読み込み中">
                <div className="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : null}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Submit
            </button>
          </div>
          {/* <div>completion（EN）: {completion}</div> */}
        </form>
      </div>
    </main>
  );
};
