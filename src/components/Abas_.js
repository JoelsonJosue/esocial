/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Tabs, Tab, Button } from 'react-bootstrap'
import { RowStyle } from './styles_';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Row, Col, FormGroup} from 'react-bootstrap'
import schema from './schema_'

export default function Abas() {

    const [key, setKey] = useState('fase-1');

    function onSubmit(values, actions) {
      console.log('SUBMIT: ', values);
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
            render={({ values, isValid }) => (
              <>
                {JSON.stringify(values)};
                <Form>
                  <RowStyle>
                    <Tabs
                      id="abas"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                    >
                      <Tab eventKey="fase-1" title="Fase 1">
                        
                          <Row>
                            <Col sm={4}>
                              <FormGroup>
                                <label className="labelRadio">
                                  <Field type="radio" name="tipo" value="1" />
                                  Salvar Evento
                                </label>
                                <label className="labelRadio">
                                  <Field type="radio" name="tipo" value="2" />
                                  Gerar XML
                                </label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={2}>
                              <FormGroup>
                                <label htmlFor="evento">Evento: </label>
                                <Field as="select" id="evento" name="evento" className="form-control">
                                  <option value="default">Todos</option>
                                  <option value="S1000">S-1000</option>
                                  <option value="S1005">S-1005</option>
                                  <option value="S1010">S-1010</option>
                                  <option value="S1020">S-1020</option>
                                  <option value="S1070">S-1070</option>
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={3}>
                              {values.tipo === '1' && (
                              <FormGroup>
                                <label htmlFor="entidade">Entidade (CNPJ): </label>
                                <Field
                                  type="text" 
                                  name="entidade"
                                  id="entidade" 
                                  className="form-control"
                                  placeholder="Entidade"
                                />
                                <ErrorMessage name="entidade">
                                  { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                </ErrorMessage>
                              </FormGroup>
                              )}
                              {values.tipo === '2' && (
                              <FormGroup>
                                <label htmlFor="nrinsc">Número de Inscrição (NrInsc): </label>
                                <Field
                                  type="text" 
                                  name="nrinsc"
                                  id="nrinsc" 
                                  className="form-control" 
                                  placeholder="Número de Inscrição (NrInsc)"
                                />
                                <ErrorMessage name="nrinsc">
                                  { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                </ErrorMessage>
                              </FormGroup>
                              )}
                              {(values.evento === 'S1010' && values.tipo === '1') && (
                              <FormGroup>
                                <label htmlFor="codrubr">Código da Rúbrica (CodRubr): </label>
                                <Field
                                  type="text" 
                                  name="codrubr"
                                  id="codrubr" 
                                  className="form-control" 
                                  placeholder="Código da Rúbrica (CodRubr)"
                                />
                              </FormGroup>
                              )}
                              {(values.evento === 'S1020' && values.tipo === '1') && (
                              <FormGroup>
                                <label htmlFor="codlotacao">Código da Lotação (CodLotacao): </label>
                                <Field
                                  type="text" 
                                  name="codlotacao"
                                  id="codlotacao" 
                                  className="form-control"
                                  placeholder="Código da Lotação (CodLotacao)"
                                />
                              </FormGroup>
                              )}
                              {(values.evento === 'S1070' && values.tipo === '1') && (
                              <FormGroup>
                                <label htmlFor="tpproc">Tipo de Processo (TpProc): </label>
                                <Field
                                  type="text" 
                                  name="tpproc"
                                  id="tpproc" 
                                  className="form-control"
                                  placeholder="Tipo de Processo (TpProc)"
                                />
                              </FormGroup>
                              )}
                              {(values.evento === 'S1070' && values.tipo === '1') && (
                              <FormGroup>
                                <label htmlFor="nrproc">Número do Processo (NrProc): </label>
                                <Field
                                  type="text" 
                                  name="nrproc"
                                  id="nrproc" 
                                  className="form-control"
                                  placeholder="Número do Processo (NrProc)"
                                />
                              </FormGroup>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={2}>
                              <FormGroup>
                                <label htmlFor="database">Código do Banco: </label>
                                <Field
                                  type="number" 
                                  name="database"
                                  id="database" 
                                  className="form-control"
                                  placeholder="Database"
                                />
                                <ErrorMessage name="database">
                                  { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                </ErrorMessage>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button as="input" disabled={!isValid} type="submit" value="Enviar" />
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
              </>
            )}
          />
    )
}