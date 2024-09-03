import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import FormInput from '../../components/FormInput/FormInput';

import '../reporting/Cdp.css';
import {getCdpData} from  '../../redux/slices/cdpslice'

function Cdp() {
  const dispatch = useDispatch();
  const { data: cdpData = {}, loading, error } = useSelector((state) => state.cdp);

  const cdpState = useSelector((state) => state.cdp);
  console.log('CDP State:', cdpState);


  useEffect(() => {
    dispatch(getCdpData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: '400px', lineHeight: '10px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <h3 className="text-[#014d4ecd] font-bold">CDP Reporting Year</h3>
        </Col>
        <Col span={6}>
          <h4 className="text-[#717171]">{cdpData.reportingYear || 'N/A'}</h4>
        </Col>
        <Col span={6}>
          <h3 className="text-[#014d4ecd] font-bold">CDP Score</h3>
        </Col>
        <Col span={6}>
          <h4 className="text-[#717171]">{cdpData.cdpScore || 'N/A'}</h4>
        </Col>
      </Row>
      
      <div>
        <h4 className="text-[#014d4ecd] leading-[4] font-bold">Emission Data [C6]</h4>
      </div>
      
      <Row gutter={[16, 16]}>
        {cdpData.emissionDataList?.map((emission, index) => (
          <React.Fragment key={index}>
            <Col span={8}>
              <FormInput 
                className="text-[#014d4ecd]" 
                label={`Scope 1 Location Based [C6] - ${index + 1}`} 
                placeholder={emission.scope1 || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
            <Col span={8}>
              <FormInput 
                style="w-[80%]" 
                label={`Scope 2 Location Based [C6.3] - ${index + 1}`} 
                placeholder={emission.scope2LocationBased || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
            <Col span={8}>
              <FormInput 
                style="w-[80%]" 
                label={`Scope 2 Market Based [C6.3] - ${index + 1}`} 
                placeholder={emission.scope2MarketBased || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <div>
        <h4 className="text-[#014d4ecd] font-bold leading-[3]">Annual Savings</h4>
      </div>

      <Row gutter={[16, 16]}>
        {cdpData.annualSavingsList?.map((saving, index) => (
          <React.Fragment key={index}>
            <Col span={8}>
              <FormInput 
                style="w-[80%]" 
                label={`Initiative Category - ${index + 1}`} 
                placeholder={saving.initiativeCategory || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
            <Col span={8}>
              <FormInput 
                style="w-[80%]" 
                label={`Annual CO2 Savings - ${index + 1}`} 
                placeholder={saving.annualCo2Savings || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
            <Col span={8}>
              <FormInput 
                style="w-[80%]" 
                label={`Lifetime of Initiative - ${index + 1}`} 
                placeholder={saving.lifetimeOfInitiative || 'N/A'} 
                labelStyle={{ color: '#014d4ecd', fontWeight: 'bold' }} 
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <h4 className="text-[#014d4ecd] font-bold mt-2">Comments</h4>
        </Col>
        <Col span={16}>
          <p className="cdp-subtitle leading-loose mt-1">
            {cdpData.comments || 'Energy efficiency program targets natural gas and electricity use at data centers, retail stores, offices, and R&D facilities located around the world.'}
          </p>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <h4 className="text-[#014d4ecd] font-bold mt-4">Intensity % attributed for your company</h4>
        </Col>
        <Col span={8}>
          <h4 className="cdp-subtitle mt-4">{cdpData.percentageOfIntensity || 'N/A'}</h4>
        </Col>
      </Row>
    </div>
  );
}

export default Cdp;