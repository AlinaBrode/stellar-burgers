import { getIngredientsApi } from '../../utils/burger-api';
import mockIngredients from '../../data/ingredients.json';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Ingredients API', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch mock ingredients data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ success: true, data: mockIngredients })
    );

    const response = await getIngredientsApi();

    // Check if the response data matches the mockIngredients
    expect(response).toEqual(mockIngredients);
  });
});
