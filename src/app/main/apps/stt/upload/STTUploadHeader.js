import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Back from 'app/shared-components/Back';

function STTUploadHeader(props) {
  return (
    <div className="flex items-center gap-x-16 mb-10">
      <Back />

      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-bold tracking-wider"
      >
        Speech To Text
      </Typography>
    </div>
  );
}

export default STTUploadHeader;
