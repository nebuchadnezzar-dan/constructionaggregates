import React, {Component} from 'react'

import styles from './HaulTable.module.scss'

import Button from '../../../components/UI/Button/Button'

import { IoMdEye } from "react-icons/io"

class HaulTable extends Component {

  render() {
    return (
      <div className={styles.hauls}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Time Left</th>
              <th>Time Arrived</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.hauls.map((el, i) => (
              <tr key={el.id} className={i%2===0 ? styles.even: styles.odd} >
                <td>{el.id}</td>
                <td>{el.time_left}</td>
                <td>{el.time_arrived}</td>
                <td><Button color="sea"><IoMdEye/></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default HaulTable