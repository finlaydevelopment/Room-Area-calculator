import React, { useState } from "react";
import "../styles/Measurement.css";

const MeasurementForm = ({ product }) => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [totalSquareMeters, setTotalSquareMeters] = useState('');
  const [useTotalSquareMeters, setUseTotalSquareMeters] = useState(true);
  const [unit, setUnit] = useState('m2');

  const squareMetersToSquareFeet = 10.7639;
  const convertArea = (area, toUnit) => {
    return toUnit === 'ft2' ? area * squareMetersToSquareFeet : area / squareMetersToSquareFeet;
  };

  const calculateTotalBoxes = () => {
    let area = useTotalSquareMeters ? parseFloat(totalSquareMeters) : width * length;
    if (unit === 'ft2') {
      area = convertArea(area, 'm2');
    }
    return Math.ceil(area / product.box_size) || 1;
  };

  const calculateTotalPrice = () => {
    return (calculateTotalBoxes() * product.box_size * product.new_price).toFixed(2);
  };

  const calculateTotalArea = () => {
    let totalArea = calculateTotalBoxes() * product.box_size;
    if (unit === 'ft2') {
      totalArea = convertArea(totalArea, 'ft2');
    }
    return totalArea.toFixed(2);
  };

  return (
    <div className="mainContainer">
      <div className='measurementUpper-container'>
        <h3>Price your area</h3>
        <div className="labelUpper-style">
          <label className={unit === 'm2' ? 'selectedUnit' : 'unselectedUnit'}>
            <input type="radio" checked={unit === 'm2'} onChange={() => setUnit('m2')} />
            m²
          </label>
          <label className={unit === 'ft2' ? 'selectedUnit' : 'unselectedUnit'}>
            <input type="radio" checked={unit === 'ft2'} onChange={() => setUnit('ft2')} />
            ft²
          </label>
        </div>
      </div>

      <div className="labelLower-style">
        <label className={useTotalSquareMeters ? 'selectedUnit' : 'unselectedUnit'}>
          <input type="radio" checked={useTotalSquareMeters} onChange={() => setUseTotalSquareMeters(true)} />
          Total Area
        </label>
        <label className={!useTotalSquareMeters ? 'selectedUnit' : 'unselectedUnit'}>
          <input type="radio" checked={!useTotalSquareMeters} onChange={() => setUseTotalSquareMeters(false)} />
          W x L
        </label>
      </div>

      <div className="userInput-style">
        {useTotalSquareMeters ? (
          <input type="number" value={totalSquareMeters} placeholder={`Total Area (${unit})`} onChange={(e) => setTotalSquareMeters(e.target.value)} />
        ) : (
          <>
            <input type="number" value={width} placeholder={`Width (${unit})`} onChange={(e) => setWidth(e.target.value)} />
            <p>x</p>
            <input type="number" value={length} placeholder={`Length (${unit})`} onChange={(e) => setLength(e.target.value)} />
          </>
        )}
      </div>

      <div className="containerFlex">
        <div>
          <p className='infoDisplay'>{calculateTotalBoxes()} {calculateTotalBoxes() === 1 ? 'Box' : 'Boxes'}</p>
          <p className='font15'>will cover: {calculateTotalArea()} {unit}</p>
        </div>
        <div>
          <p className='infoDisplay'>£{calculateTotalPrice()}</p>
          <p className='font15'>inc VAT</p>
        </div>
      </div>
    </div>
  );
}

export default MeasurementForm;
