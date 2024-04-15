// Remove the import statement for CommerceSDK

const devEnvironment = process.env.NODE_ENV === 'development';

const commerceConfig = {
  axiosConfig: {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-09-29',
    },
  },
};

// Remove the instantiation of CommerceSDK

// Export an empty object instead
const commerce = {};

export default commerce;
