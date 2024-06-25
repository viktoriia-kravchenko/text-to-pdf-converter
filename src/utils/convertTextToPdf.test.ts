import { API_KEY, BASE_URL, ENDPOINT } from '../constants/constants';
import { convertTextToPdf } from './helpers';

global.fetch = jest.fn();

describe('convertTextToPdf', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should convert text to PDF and return a blob URL', async () => {
    const input = 'Contrary to popular belief, Lorem Ipsum is not random text.';
    const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    const pdfURL = URL.createObjectURL(pdfBlob);

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(pdfBlob),
    });

    URL.createObjectURL = jest.fn().mockReturnValue(pdfURL);

    const result = await convertTextToPdf(input);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${ENDPOINT}?apiKey=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
        }),
      },
    );

    expect(result).toBe(pdfURL);
  });

  it('should throw an error if the network response is not OK', async () => {
    const input = 'Contrary to popular belief, Lorem Ipsum is not random text.';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(convertTextToPdf(input)).rejects.toThrow(
      'Network response was not OK',
    );
  });

  it('should throw an error if fetch fails', async () => {
    const input = 'Contrary to popular belief, Lorem Ipsum is not random text.';
    const errorMessage = 'Fetch failed';

    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(convertTextToPdf(input)).rejects.toThrow(
      `Error while fetching pdf: ${errorMessage}`,
    );
  });
});
