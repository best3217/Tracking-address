/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal, 
  ModalHeader,
  ModalBody, 
  ModalFooter,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Notification from "../../components/Notification/Notification.js";
import { toast } from "react-toastify";
import Widget from "../../components/Widget/Widget.js";
import * as Icons from "@material-ui/icons";

import s from "./Tables.module.scss";

const Address = function () {

  const [TableCurrentPage, setTableCurrentPage] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [modalShow, setmodalShow] = useState(false);

  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [note, setNote] = useState('');

  const pageSize = 10;
  const TablePagesCount = Math.ceil(addresses.length / pageSize);

  const options = {
    autoClose: 4000,
    closeButton: false,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT,
  };

  const setTablePage = (e, index) => {
    e.preventDefault();
    setTableCurrentPage(index);
  }

  const getAddress = async () => {
    const response = await axios.get('http://localhost:5000/token');
    setAddresses(response.data);
  }

  const handleClose = () => {
    setmodalShow(false);
  }

  const handleShow = (e) => {
    e.preventDefault();
    setmodalShow(true);
  }

  const createAddress = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/token',{
        address: address,
        comment: comment,
        note: note,
    }).then(function(res) {
        if(res.status == 200) {
          toast(<Notification type={'success'} withIcon msg={res.data.message} />, options);
          getAddress();
          setmodalShow(false);
          setAddress('');
          setComment('');
          setNote('');
        }else {
          toast(<Notification type={'error'} withIcon msg={res.data.message} />, options);
        }
    })
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">States Colors</div>
                  <div className="d-flex">
                    <a href="#" onClick={ e => handleShow(e) } title="Add Address"><Icons.AddCircleOutline /></a>
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                      <th className="w-25">ADDRESS</th>
                      <th className="w-25">BALANCE</th>
                      <th className="w-25">COMMENT</th>
                      <th className="w-25">NOTE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addresses
                      .slice(
                        TableCurrentPage * pageSize,
                        (TableCurrentPage + 1) * pageSize
                      )
                      .map(item => (
                        <tr key={uuidv4()} id={item.id}>
                          <td>{item.address}</td>
                          <td>{item.balance}</td>
                          <td>{item.comment}</td>
                          <td>{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-borderless" aria-label="Page navigation example">
                    <PaginationItem disabled={TableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setTablePage(e, TableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(TablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === TableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={TableCurrentPage >= TablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setTablePage(e, TableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal size="lg" isOpen={modalShow}>
          <form onSubmit={createAddress}>
            <ModalHeader>
              {/* <Modal.Title>Modal heading</Modal.Title> */}
            </ModalHeader>
            <ModalBody>
                <FormGroup className="mb-4">
                  <FormText className="mb-1">Address</FormText>
                  <Input 
                    id="address"
                    className="input-transparent pl-3"
                    type="text"
                    required
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <FormText className="mb-1">Comment</FormText>
                      <Input 
                        id="comment"
                        className="input-transparent pl-3"
                        type="textarea"
                        rows={9}
                        required
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <FormText className="mb-1">Note</FormText>
                      <Input 
                        id="note"
                        className="input-transparent pl-3"
                        type="textarea"
                        rows={9}
                        required
                        placeholder="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button color="primary">
                Submit
              </Button>
            </ModalFooter>
          </form>
      </Modal>
    </div>
  )
}

export default Address;
