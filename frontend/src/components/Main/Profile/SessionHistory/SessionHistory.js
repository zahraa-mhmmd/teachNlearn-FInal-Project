import React from 'react';
import './SessionHistory.scss';
import Card from '../../../Card/Card';

const SessionHistory = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Session History</h2>
        </div>
        <div className="user-education-history-wrapper">
          <div className="session">
            <div className="session-panel">
              <div className="session-details">
                <span>15/1/2024</span>
                <span>Dr. Sarah Jones</span>
              </div>
              <div className="tags-wrapper">
                <span className="tag">mathematics</span>
                <span className="tag">algebra</span>
                <span className="tag">matrices</span>
              </div>
            </div>
            <div className="session-notes">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corrupti, sequi necessitatibus! Qui deserunt, neque est porro
                minima mollitia temporibus et, provident nemo aliquid voluptate
                iusto? Facilis, perferendis iusto modi accusantium veniam earum
                iure perspiciatis excepturi commodi nam possimus a tempora,
                tempore pariatur quam hic harum! Voluptatem saepe veniam eos
                soluta eius sed accusamus aperiam itaque, cumque odio ab natus
                tempora consequuntur ex suscipit impedit numquam iure.
                Praesentium quae iusto quod minima consequatur porro deserunt ex
                quam tempore distinctio, recusandae labore inventore corporis
                assumenda voluptates consequuntur! Voluptatibus, non harum
                temporibus saepe corrupti maxime fugiat ab aperiam similique ad
                optio ratione beatae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SessionHistory;
