const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    try {
      return item;
    } catch (error) {
      console.error(`Error parsing JSON for key '${key}':`, error);
      return null;
    }
  };
export default getLocalStorageItem;