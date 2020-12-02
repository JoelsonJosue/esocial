/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { RowStyle } from './styles';
import { Formik, Form } from 'formik';
import schema from './schema'
import Fase1 from './Fase1/index'

export default function Abas() {

    const [key, setKey] = useState('fase-1');
    const [log, setLog] = useState('');

    function onSubmit(values, actions) {
      let json = '';
      json += '<p>teste1</p>';
      json += '<p>teste2</p>';
      json += '<p>teste3</p>';
      setLog(json);
    }

    return (
          <Formik
            validationSchema={schema} 
            initialValues={{
              tipo: '1',
              entidade: '',
              codrubr: '',
              codlotacao: '',
              tpproc: '',
              nrproc: '',
              nrinsc: '',
              evento: 'default',
              database: '',
            }}
            validateOnMount
            onSubmit={onSubmit}
            /*render={({ values, isValid }) => (
              <>
                <p>teste</p>
              </>
            )}*/
          >
            {({ values, isValid }) => (
              <Form>
                {JSON.stringify(values)}
                <RowStyle>
                  <Tabs
                    id="abas"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="fase-1" title="Fase 1">
                        <Fase1 values={values} isValid={isValid} Log={log} />
                    </Tab>
                    <Tab eventKey="fase-2" title="Fase 2">
                      <p>Fase 2</p>
                    </Tab>
                    <Tab eventKey="fase-3" title="Fase 3">
                      <p>Fase 3</p>
                    </Tab>
                  </Tabs>
                </RowStyle>
              </Form>
            )}
          </Formik>
    )
}