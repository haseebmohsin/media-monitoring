import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Typography from '@mui/material/Typography';
import { Radio } from '@mui/material';

const radioStyle = {
  '& .MuiSvgIcon-root': {
    fontSize: 17,
  },
  color: 'white',
  '&.Mui-checked': {
    color: 'white',
  },
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: '3px',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(24, 38, 45, .9)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomAccordion(props) {
  const {
    title,
    isProfileChecked = false,
    isKeywordChecked = false,
    id,
    expanded,
    handleChange,
    selectedRadioValue,
    handleRadioChange,
    children,
  } = props;

  return (
    <Accordion expanded={expanded.includes(id)} onChange={handleChange(id)}>
      <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`}>
        <div className="flex items-center">
          {isProfileChecked && (
            <Radio
              checked={selectedRadioValue === 'profile'}
              value="profile"
              name="radio-buttons"
              onChange={(e) => handleRadioChange(e)}
              inputProps={{ 'aria-label': 'profile' }}
              sx={radioStyle}
            />
          )}

          {isKeywordChecked && (
            <Radio
              checked={selectedRadioValue === 'keywords'}
              value="keywords"
              name="radio-buttons"
              onChange={(e) => handleRadioChange(e)}
              inputProps={{ 'aria-label': 'keywords' }}
              sx={radioStyle}
            />
          )}

          <Typography style={{ color: 'white' }}>{title}</Typography>
        </div>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
