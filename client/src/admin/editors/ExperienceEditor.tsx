import React from 'react';
import { motion } from 'framer-motion';

export default function ExperienceEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=\"mb-6\">
        <h2 className=\"text-2xl font-semibold mb-2\">Experience Section</h2>
        <p className=\"text-muted-foreground\">
          Experience editor - Coming soon!
        </p>
      </div>
    </motion.div>
  );
}