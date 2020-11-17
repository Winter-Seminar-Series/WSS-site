import React, { useState, useEffect } from 'react';

function StaffList() {
  return (
    <>
      <section id="ts-speakers" className="blue-gradient ts-speakers diagonal ">
        <div>
          <div className="container">
            {/* {% for holding_team in wss.holding_teams.all %} */}
            <div className="row">
              <h2 className="mb-1 col section-sub-title title-white">
                {/* {{ holding_team.name }} */}
              </h2>
            </div>
            <div className="row">
              {/* {% for staff in holding_team.staff.all %} */}
              <div className="col-xs-12 col-sm-6 col-md-3">
                {/* {% render_human staff %} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default StaffList;
