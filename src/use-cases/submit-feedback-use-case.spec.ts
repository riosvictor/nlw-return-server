import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe('Given 2 and 2', () => {
  describe('When making a sum', () => {
    test('Then return 4', () => {
      const num1 = 2;
      const num2 = 2;

      const sum = num1 + num2;

      expect(sum).toBe(4);
    });
  });
});

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,8as4dfd98a4d563a1sd65sa',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,8as4dfd98a4d563a1sd65sa',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,8as4dfd98a4d563a1sd65sa',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'tá tudo bugado',
        screenshot: 'test.png',
      })
    ).rejects.toThrow();
  });
});