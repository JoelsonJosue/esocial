/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { RowStyle } from './styles';
import { Formik, Form } from 'formik';
import schema from './schema'
import Fase1 from './Fase1/index'
import api from '../../services/api'

export default function Abas() {

  const [key, setKey] = useState('fase-1');
  const [log, setLog] = useState('');

  async function onSubmit(values, actions) {

    let appendLog = '<p style="color: blue; font-weight: bold;">Processando...</p>';

    setLog(appendLog);

    const evento = values.evento;

    if (values.tipo === '1') {

      const json = JSON.stringify({
        database: values.database,
        entidade: values.entidade,
        codrubr: values.codrubr,
        evento: values.evento,
        codlotacao: values.codlotacao,
        tpproc: values.tpproc,
        nrproc: values.nrproc,
        exclusao: values.exclusao,
      });

      const response = await api.post("esocial/eventos", json, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          //appendLog += '<p style="color: blue; font-weight: bold;">---------- Início-> (Evento: ' + evento + ') ----------</p>';

          if (response.data[evento]) {

              const obj = response.data[evento];

              if (evento !== 'S1000' && evento !== 'S1005') {

                  for (var keyOne in obj) {
                    //appendLog += '<p style="color: red">' + keyOne + '</p>';
                    for (var keyTwo in obj[keyOne]) {
                      //appendLog += '<p style="color: red">' + keyTwo + '</p>';
                      for (var keyThree in obj[keyOne][keyTwo]) {
                        //appendLog += '<p style="color: red">' + keyThree + '</p>';
                        if(typeof obj[keyOne][keyTwo][keyThree] === 'object'){
                          let existeProcessamento = false;
                          for (var keyFour in obj[keyOne][keyTwo][keyThree]) {
                            if(keyFour === 'criticas'){
                              if(typeof obj[keyOne][keyTwo][keyThree]['processamento'] === 'undefined'){
                                if(obj[keyOne][keyTwo][keyThree][keyFour] !== null){
                                  appendLog += '<p style="color: red; font-weight: bold;">(NrInsc: ' + keyTwo + ', Código: '+ keyThree +') - Críticas:</p>';
                                  for(var keyFive in obj[keyOne][keyTwo][keyThree][keyFour]){
                                    appendLog += '<p style="color: red;">- ' + obj[keyOne][keyTwo][keyThree][keyFour][keyFive] + '</p>';
                                  }
                                }else{
                                  if(!existeProcessamento){
                                    appendLog += '<p style="color: green; font-weight: bold;">O evento ' 
                                    + evento + 
                                    ' de código ' + keyThree + ' informado foi salvo com sucesso!</p>';
                                  }
                                }
                              }
                            }else if(keyFour === 'processamento'){
                              existeProcessamento = true;
                              appendLog += '<p style="color: green; font-weight: bold;">' + obj[keyOne][keyTwo][keyThree][keyFour] + '</p>';
                            }
                            //appendLog += '<p style="color: red">' + keyFour + '</p>';
                          }
                        }else{
                          appendLog += '<p style="color: red;">- ' + obj[keyOne][keyTwo][keyThree] + '</p>';
                        }
            
                      }
                      /*if(keyTwo === 'processamento'){
                        console.log('Entrou');
                        existeProcessamento = true;
                        appendLog += '<p style="color: green; font-weight: bold;">' + obj[keyOne][keyTwo] + '</p>';
                      }else{
                        if(obj[keyOne][keyTwo] !== null){
                          appendLog += '<p style="color: red; font-weight: bold;">(NrInsc: ' + keyTwo + ') - Críticas:</p>';
                          for (var keyThree in obj[keyOne][keyTwo]) {
                            appendLog += '<p style="color: red;">- ' + obj[keyOne][keyTwo][keyThree] + '</p>';
                          }
                        }else{
                            //console.log(existeProcessamento);
                            if(!existeProcessamento){
                              appendLog += '<p style="color: green; font-weight: bold;">O evento ' 
                              + evento + 
                              ' informado foi salvo com sucesso!</p>';
                            }
                        }
                      }*/
                    }
                  }

                //appendLog += '<p style="color: red">' + JSON.stringify(obj) + '</p>';
                /*let i = 1;
                for (var chave1 in response.data[evento]) {
                  for (var chave2 in response.data[evento][chave1]) {
                    for (var chave3 in response.data[evento][chave1][chave2]) {
                      for (var chave4 in response.data[evento][chave1][chave2][chave3]) {
                        if (response.data[evento][chave1][chave2][chave3][chave4] !== null) {
                          appendLog += '<p style="color: red">' + JSON.stringify(response.data[evento][chave1]) + '</p>';
                        } else {

                          if (i === 1) {
                            appendLog += '<p style="color: green; font-weight: bold;">Evento(s) salvo com sucesso!</p>';
                          }
                          i++;
                        }
                      }
                    }
                  }
                }*/

              } else {

                  let existeProcessamento = false;
                  for (var keyOne in obj) {
                    for (var keyTwo in obj[keyOne]) {
                      if(keyTwo === 'processamento'){
                        //console.log('Entrou');
                        existeProcessamento = true;
                        appendLog += '<p style="color: green; font-weight: bold;">' + obj[keyOne][keyTwo] + '</p>';
                      }else{
                        if(obj[keyOne][keyTwo] !== null){

                          if(typeof obj[keyOne][keyTwo] === 'object'){
                            appendLog += '<p style="color: red; font-weight: bold;">(NrInsc: ' + keyTwo + ') - Críticas:</p>';
                            for (var keyThree in obj[keyOne][keyTwo]) {
                              appendLog += '<p style="color: red;">- ' + obj[keyOne][keyTwo][keyThree] + '</p>';
                            }
                          }else{
                            appendLog += '<p style="color: red;">- ' + obj[keyOne][keyTwo] + '</p>';
                          }
                          
                        }else{
                            //console.log(existeProcessamento);
                            if(!existeProcessamento){
                              appendLog += '<p style="color: green; font-weight: bold;">O evento ' 
                              + evento + 
                              ' informado foi salvo com sucesso!</p>';
                            }
                        }
                      }
                    }
                  }

              }

          } else {

              appendLog += '<p style="color: red">' + response.data + '</p>';
              setLog(appendLog);

          }
          
          //appendLog += '<p style="color: blue; font-weight: bold;">---------- FIM  ----------</p>';

        })
        .catch((err) => {
          appendLog += '<p>Ocorreu um erro de conexão: ' + err + '</p>';
          setLog(appendLog);
          //console.error("Ocorreu um erro de conexão " + err);
        });

    } else if (values.tipo === '2') {

      const json = JSON.stringify({
        database: values.database,
        nrinsc: values.nrinsc,
        evento: values.evento
      });

      const response = await api.post("esocial/xml", json, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {

          if (response.data.msg) {

            appendLog += '<p style="color: blue; font-weight: bold;">---------- XML-> (Evento: ' + evento + ') ----------</p>';
            if (response.data.status) {
              appendLog += '<p style="color: green; font-weight: bold;">' + response.data.msg + '</p>';
            } else {
              appendLog += '<p style="color: red">' + response.data.msg + '</p>';
            }
            appendLog += '<p style="color: blue; font-weight: bold;">---------- FIM  ----------</p>';

          } else {
            appendLog += '<p style="color: red">' + response.data + '</p>';
            setLog(appendLog);
          }

        })
        .catch((err) => {
          appendLog += '<p>Ocorreu um erro na geração do XML: ' + err + '</p>';
          setLog(appendLog);
          //console.error("Ocorreu um erro de conexão " + err);
        });

    }

    appendLog += '<p style="color: blue; font-weight: bold;">Concluído!</p>';
    setLog(appendLog);

    //console.log(log);                            
    /*let json = '';
    json += '<p>teste1</p>';
    json += '<p>teste2</p>';
    json += '<p>teste3</p>';*/
    //setLog(json);
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
        evento: '',
        database: '',
        exclusao: 'false',
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