import React, { Fragment } from "react";
import { Card } from "primereact/card";

const CardDemo = (props) => {
  return (
    <Fragment>
      <div
        className="flex flex-wrap ml-5 mb-5 col-12 md-6 lg-3 "
        // style={{
        //   marginLeft: '22px',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   flexWrap: 'wrap',
        // }}
      >
        <div
          className="col p-0 border-round w-20rem"
          style={{
            backgroundColor: props.color,
          }}
        >
          <div
            className="surface-0 shadow-2 p-3 border-1 border-50 border-round w-20rem mb-1"
            // style={{ width: '310px', marginBottom: '4px' }}
          >
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  {props.title}
                </span>
                <div className="text-900 font-medium text-xl">
                  {props.content}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center border-round w-2rem h-2rem"
                style={{
                  //   width: '2.5rem',
                  //   height: '2.5rem',
                  backgroundColor: props.color,
                }}
              >
                <i
                  className={props.icon}
                  style={{ color: props.iconColor }}
                ></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {props.update} new{" "}
            </span>
            <span className="text-500">since last visit</span>
          </div>
        </div>
      </div>
      {/* 
      <div
        className="grid"
        style={{
          marginLeft: '22px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="col-12 md:col-6 lg:col-3"
          style={{
            padding: '0px 0px 0px 0px',
            backgroundColor: props.color,
            borderRadius: '2%',
            width: '310px',
            marginRight: '15px',
          }}
        >
          <div
            className="surface-0 shadow-2 p-3 border-1 border-50 border-round"
            style={{ width: '310px', marginBottom: '4px' }}
          >
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  {props.title}
                </span>
                <div className="text-900 font-medium text-xl">
                  {props.content}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: props.color,
                }}
              >
                <i
                  className={props.icon}
                  style={{ color: props.iconColor }}
                ></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {props.update} new{' '}
            </span>
            <span className="text-500">since last visit</span>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default CardDemo;
