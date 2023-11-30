import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { showMessage } from 'app/store/fuse/messageSlice';
import useLocalStorage from '@fuse/hooks/useLocalStorage';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getFilteredTickers, selectFilters } from '../main/apps/tickers/store/tickersSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddWordComponent({ open, onClose, setSearchText }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [selectedLanguage, setSelectedLanguage] = useState('urdu');
  const [word, setWord] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [wordsListUrdu, setWordsListUrdu] = useLocalStorage('wordsListUrdu', []);
  const [wordsListEnglish, setWordsListEnglish] = useLocalStorage('wordsListEnglish', []);

  useEffect(() => {
    if (selectedLanguage === 'urdu') {
      setWordsListUrdu(wordsListUrdu);
    } else {
      setWordsListEnglish(wordsListEnglish);
    }
  }, [wordsListUrdu, wordsListEnglish, selectedLanguage, setWordsListUrdu, setWordsListEnglish]);

  const handleAddClick = () => {
    if (word.trim() === '') {
      return; // Do nothing if the input is empty
    }

    // Regular expression to match English characters
    const englishRegex = /[a-zA-Z]/;

    if (selectedLanguage === 'urdu' && englishRegex.test(word)) {
      dispatch(showMessage({ message: 'No English words are allowed here' }));
      return;
    }

    const updatedList = selectedLanguage === 'urdu' ? wordsListUrdu : wordsListEnglish;

    if (!updatedList.includes(word)) {
      if (selectedLanguage === 'urdu') {
        setWordsListUrdu([...wordsListUrdu, word]);
      } else {
        setWordsListEnglish([...wordsListEnglish, word]);
      }

      setWord('');
    } else {
      dispatch(showMessage({ message: 'This Word is already in the list' }));
    }
  };

  const handleDeleteClick = () => {
    // Remove the selected word from the wordsList and update localStorage
    const updatedWordsList =
      selectedLanguage === 'urdu'
        ? wordsListUrdu.filter((singleWord) => singleWord !== selectedWord)
        : wordsListEnglish.filter((singleWord) => singleWord !== selectedWord);

    if (selectedLanguage === 'urdu') {
      setWordsListUrdu(updatedWordsList);
    } else {
      setWordsListEnglish(updatedWordsList);
    }

    setSelectedWord('');
  };

  const handleSearchClick = () => {
    setSearchText(selectedWord);
    dispatch(getFilteredTickers({ ...filters, searchText: selectedWord }));

    // Close the modal
    setSelectedWord('');
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="flex items-center justify-between">
            <div>Add a Word</div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="channels-label">Choose Add Word</InputLabel>
                <Select
                  className="bg-white"
                  labelId="channels-label"
                  id="channels"
                  value={selectedLanguage}
                  label="Choose Channel Type"
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                  }}
                >
                  <MenuItem value="urdu">Add Urdu Word</MenuItem>
                  <MenuItem value="english">Add English Word</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="flex items-center justify-between">
            <TextField
              className="w-[88%]"
              label={`Enter a ${selectedLanguage === 'urdu' ? 'Urdu' : 'English'} word`}
              margin="dense"
              id="word"
              type="text"
              variant="standard"
              autoFocus
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <Button
              className="rounded-lg w-24 mt-24 whitespace-nowrap px-6"
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleAddClick}
            >
              Add
            </Button>
          </div>

          <div className="mt-16">
            {selectedLanguage === 'urdu'
              ? wordsListUrdu.map((singleWord, index) => (
                  <Button
                    className="mx-2 urdu-text font-black text-xl"
                    key={index}
                    variant="outlined"
                    color="primary"
                    onClick={() => setSelectedWord(singleWord)}
                  >
                    {singleWord}
                  </Button>
                ))
              : wordsListEnglish.map((singleWord, index) => (
                  <Button
                    className="mx-2 urdu-text font-black text-xl"
                    key={index}
                    variant="outlined"
                    color="primary"
                    onClick={() => setSelectedWord(singleWord)}
                  >
                    {singleWord}
                  </Button>
                ))}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedWord)}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={() => setSelectedWord('')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>What would you like to do with "{selectedWord}"?</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose an action for the selected word</DialogContentText>
        </DialogContent>

        <div className="flex justify-between items-center p-16">
          <div>
            <Button onClick={handleDeleteClick} color="error">
              Delete This Word
            </Button>
          </div>

          <div>
            <Button onClick={() => setSelectedWord('')} color="primary">
              Cancel
            </Button>

            <Button onClick={handleSearchClick} color="secondary">
              Search this Word
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddWordComponent;
