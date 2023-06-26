import Image from 'next/image';
import {Inter} from 'next/font/google';
import {useEffect, useState} from 'react';
import {useCompletion} from 'ai/react';
import {BaseInput} from 'src/parts/input';

const inter = Inter({subsets: ['latin']});

interface Languages {
  ja: string;
  en: string;
  vi: string;
}

function convertStringToArray(str: string): string[] | [] {
  try {
    console.log('str =>', str);
    return JSON.parse(str);
  } catch (error: any) {
    console.error(`エラーが発生しました: ${error.message}`);
    return [];
  }
}

export const Top = () => {
  const [langArr, setLangArr] = useState<Languages[]>([
    {
      ja: '',
      en: '',
      vi: '',
    },
  ]);

  const [lang, setLang] = useState('English');

  const {complete, isLoading} = useCompletion({
    onFinish: (prompt, completion) => {
      console.log('prompt =>', prompt);
      console.log('completion =>', completion);
      const arrCompletion = convertStringToArray(completion);
      const newArr = [...langArr];
      if (lang === 'English') {
        newArr.forEach((lang, index) => {
          newArr[index].en = arrCompletion[index];
        });
        setLangArr(newArr);
      }
      if (lang === 'Vietnamese') {
        newArr.forEach((lang, index) => {
          newArr[index].vi = arrCompletion[index];
        });
        setLangArr(newArr);
      }
    },
  });

  function handleChangeLang(e: React.ChangeEvent<HTMLSelectElement>) {
    setLang(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const jaWords = langArr.map((lang) => lang.ja).join(',');

    const prompt = `Please translate the following comma-separated words into ${lang}. Please return their values in the  array format.
    Absolutely no other information is needed.

    [${jaWords}]`;

    complete(prompt);
  }

  function addRow(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const newArr = [...langArr];
    newArr.push({
      ja: '',
      en: '',
      vi: '',
    });

    setLangArr(newArr);
  }

  function removeRow(index: number) {
    const newArr = [...langArr];
    newArr.splice(index, 1);

    setLangArr(newArr);
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
          <div>
            {langArr.map((lang, index) => (
              <div className="flex gap-4 pb-4 items-end" key={index}>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">日本語</label>
                  <BaseInput
                    value={langArr[index].ja}
                    onChange={(e) => {
                      const newArr = [...langArr];
                      newArr[index].ja = e.target.value;

                      setLangArr(newArr);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">English</label>
                  <BaseInput
                    value={langArr[index].en}
                    onChange={(e) => {
                      const newArr = [...langArr];
                      newArr[index].en = e.target.value;

                      setLangArr(newArr);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Vietnamese</label>
                  <BaseInput
                    value={langArr[index].vi}
                    onChange={(e) => {
                      const newArr = [...langArr];
                      newArr[index].vi = e.target.value;

                      setLangArr(newArr);
                    }}
                  />
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded-full h-10"
                  onClick={() => removeRow(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 items-center">
            <button
              onClick={addRow}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
            >
              ＋ add
            </button>
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
