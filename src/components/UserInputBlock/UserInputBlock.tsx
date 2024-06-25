import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { convertTextToPdf } from '../../utils/helpers';

interface UserInputBlockProps {
  setPdfData: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInputBlock: FC<UserInputBlockProps> = ({ setPdfData }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (input) {
      convertTextToPdf(input)
        .then((pdfURL: string) => setPdfData(pdfURL))
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error: ', error));
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(target.value);
  };

  return (
    <section className="mb-12 w-full flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full flex-col items-center">
        <div className="w-4/5 mx-auto">
          <label
            htmlFor="content"
            className={`
              block mb-2 text-sm font-medium text-gray-900
              dark:text-white
            `}
          >
            Enter the text you would like to convert to PDF
          </label>

          <textarea
            id="content"
            onChange={handleChange}
            className={`
              block p-2.5 w-full min-h-52 text-sm text-gray-900
              bg-gray-50 rounded-lg border border-gray-300 mb-8
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500
            `}
            placeholder="Write your content here"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!input.trim()}
              className={`
                bg-emerald-500 hover:bg-emerald-600 text-white font-bold
                py-2 px-4 rounded
              `}
            >
              Convert to PDF
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
