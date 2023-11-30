import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AccordionDetails } from '@mui/material';
import useLocalStorage from '@fuse/hooks/useLocalStorage';
import { showMessage } from 'app/store/fuse/messageSlice';
import CustomAccordion from './CustomAccordion';
import platforms from '../data/platforms';
import { getScrappedKeywordOrLinkData, setRadioValue } from '../store/socialMediaScrapingSlice';
import PlatformSelectionList from './PlatformSelectionList';
import AddKeyword from './AddKeyword';
import AddLink from './AddLink';

function AddKeywordOrLink() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedPlatformNames, setSelectedPlatformNames] = useState([]);
  const [enteredLink, setEnteredLink] = useState('');
  const [enteredKeyword, setEnteredKeyword] = useState('');
  const [selectedRadioValue, setSelectedRadioValue] = useState('keywords');

  const [enteredLinks, setEnteredLinks] = useLocalStorage('enteredLinks', []);
  const [enteredKeywordsData, setEnteredKeywordsData] = useLocalStorage('enteredKeywordsData', []);

  useEffect(() => {
    dispatch(setRadioValue(selectedRadioValue));
  }, [dispatch, selectedRadioValue]);

  const getScrappedData = (item) => {
    const data = {
      query: item,
    };

    dispatch(getScrappedKeywordOrLinkData(data));
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => {
      if (newExpanded) {
        if (prevExpanded.includes(panel)) {
          return prevExpanded.filter((item) => item !== panel);
        }
        return [...prevExpanded, panel];
      }
      return prevExpanded.filter((item) => item !== panel);
    });
  };

  const handlePlatformClick = (platformName) => {
    if (selectedPlatformNames.includes(platformName)) {
      setSelectedPlatformNames(
        selectedPlatformNames.filter(
          (selectedPlatformName) => selectedPlatformName === platformName
        )
      );
    } else {
      setSelectedPlatformNames([...selectedPlatformNames, platformName]);
    }

    const selectedPlatform = platforms.find((platform) => platform.platformName === platformName);

    // Check if the selectedPlatform exists in the selectedPlatforms array
    const exists = selectedPlatforms.some(
      (platform) => platform.platformName === selectedPlatform.platformName
    );

    // If it exists, remove it; otherwise, add it
    if (exists && selectedPlatforms.length > 0) {
      const updatedPlatforms = selectedPlatforms.filter(
        (platform) => platform.platformName !== selectedPlatform.platformName
      );
      setSelectedPlatforms(updatedPlatforms);
    } else {
      const updatedPlatforms = [...selectedPlatforms, selectedPlatform];
      setSelectedPlatforms(updatedPlatforms);
    }
  };

  const handleAddLink = () => {
    if (!enteredLink) return;

    // Check for a valid link using a simple regex pattern
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(enteredLink)) {
      dispatch(showMessage({ message: 'Please enter a valid link.' }));
      return;
    }

    const updatedEnteredLinks = [...enteredLinks, enteredLink];

    setEnteredLinks(updatedEnteredLinks);

    getScrappedData(enteredLink);
    setEnteredLink('');
  };

  const handleAddKeyword = () => {
    if (!enteredKeyword) return;

    const updatedEnteredKeywordsData = [
      ...enteredKeywordsData,
      {
        keyword: enteredKeyword,
        selectedPlatformNames:
          selectedPlatformNames?.length === 0
            ? platforms.map((platform) => platform.platformName)
            : selectedPlatformNames,
        profileLinks: [],
      },
    ];

    setEnteredKeywordsData(updatedEnteredKeywordsData);

    getScrappedData(enteredKeyword);
    setEnteredKeyword('');
  };

  const handleRemoveLink = (index) => {
    const newArray = [...enteredLinks];
    newArray.splice(index, 1);
    setEnteredLinks(newArray);
  };

  const handleRemoveKeyword = (index) => {
    const newArray = [...enteredKeywordsData];
    newArray.splice(index, 1);
    setEnteredKeywordsData(newArray);
  };

  const handleRadioChange = (e) => {
    setSelectedRadioValue(e.target.value);
  };

  return (
    <CustomAccordion
      title="Add Keyword / Profile link"
      id="addTracker"
      expanded={expanded}
      handleChange={handleChange}
    >
      <AccordionDetails>
        <div>
          <CustomAccordion
            title="Profile Crawling"
            id="linkBased"
            expanded={expanded}
            isProfileChecked
            handleChange={handleChange}
            selectedRadioValue={selectedRadioValue}
            handleRadioChange={handleRadioChange}
          >
            <AccordionDetails>
              <AddLink
                enteredLinks={enteredLinks}
                enteredLink={enteredLink}
                setEnteredLink={setEnteredLink}
                handleAddLink={handleAddLink}
                handleRemoveLink={handleRemoveLink}
              />
            </AccordionDetails>
          </CustomAccordion>

          <CustomAccordion
            title="Keywords Crawling"
            id="keywordBased"
            expanded={expanded}
            isKeywordChecked
            handleChange={handleChange}
            selectedRadioValue={selectedRadioValue}
            handleRadioChange={handleRadioChange}
          >
            <AccordionDetails>
              <div>
                <PlatformSelectionList
                  selectedPlatformNames={selectedPlatformNames}
                  handlePlatformClick={handlePlatformClick}
                />
              </div>

              <AddKeyword
                enteredKeywordsData={enteredKeywordsData}
                enteredKeyword={enteredKeyword}
                setEnteredKeyword={setEnteredKeyword}
                handleAddKeyword={handleAddKeyword}
                handleRemoveItem={handleRemoveKeyword}
              />
            </AccordionDetails>
          </CustomAccordion>
        </div>
      </AccordionDetails>
    </CustomAccordion>
  );
}

export default AddKeywordOrLink;
