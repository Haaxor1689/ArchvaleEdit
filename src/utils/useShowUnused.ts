import useLocalStorage from './useLocalStorage';

const useShowUnused = () => useLocalStorage('ae-show-unused', false);
export default useShowUnused;
