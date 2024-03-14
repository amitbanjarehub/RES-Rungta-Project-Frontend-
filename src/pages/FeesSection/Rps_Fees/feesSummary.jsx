import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DummyData = [
  { feeType: 'Transport Fee', amount: 10263 },
  { feeType: 'Development Fee', amount: 15000 },
  { feeType: 'Tuition Fee (Govt./PSU Empl. Disc.)', amount: 46471 },
  { feeType: 'Total Amount', amount: 71734 },
];

const FeesSummary = () => {
  const [showSummary, setShowSummary] = useState(false);

  const handleButtonClick = () => {
    setShowSummary(!showSummary); // Toggle showSummary value
  };

  return (
    <div style={{marginLeft: "35px"}}>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        {showSummary ? 'Fees Summary' : 'Fees Summary'}
      </Button>
      {showSummary && (
        <TableContainer component={Paper}>
          <Table aria-label="fees summary">
            <TableHead>
              <TableRow>
                <TableCell>Fee Type</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DummyData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.feeType}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default FeesSummary;


