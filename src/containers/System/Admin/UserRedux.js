import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGE, CRUD_ACTIONS} from "../../../utils"
import Navigator from '../../../components/Navigator';
import { adminMenu } from '../../Header/menuApp';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '', 

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrGenders = this.props.genderRedux;
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState ({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState ({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState ({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                avatar: '', 
                action: CRUD_ACTIONS.CREATE,
            }) 
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let {action} = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }
    }
    //     //fire redux action
    //     this.props.createNewUser({
    //         email: this.state.email,
    //         password: this.state.password,
    //         firstName: this.state.firstName,
    //         lastName: this.state.lastName,
    //         address: this.state.address,
    //         phoneNumber: this.state.phoneNumber,
    //         gender: this.state.gender,
    //         roleId: this.state.role,
    //         positionId: this.state.position,
    //     })
    // }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        this.setState({
                email: user.email,
                password: 'HARDCODE',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                role: user.roleId,
                position: user.positionId,
                avatar: '',
                action: CRUD_ACTIONS.EDIT,
                userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        const { processLogout } = this.props;
        return (
            <React.Fragment>
                <div className="header-container">
                    {/* thanh navigator */}
                    <div className="header-tabs-container">
                        <Navigator menus={adminMenu} />
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                <div className="user-redux-container">
                    <div className="title">
                        User Redux
                    </div>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 my-3">Thêm mới người dùng</div>
                                <div className="col-12">{isGetGenders === true ? 'Loading genders' : ''}</div>
                                <div className="col-3">
                                    <label>Email </label>
                                    <input className="form-control" type="email" 
                                        value={email}
                                        onChange={(event) => {this.onChangeInput(event, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Mật khẩu </label>
                                    <input className="form-control" type="password"
                                        value={password}
                                        onChange={(event) => {this.onChangeInput(event, 'password') }} 
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Tên </label>
                                    <input className="form-control" type="text"
                                        value={firstName}
                                        onChange={(event) => {this.onChangeInput(event, 'firstName') }} 
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Họ </label>
                                    <input className="form-control" type="text"
                                        value={lastName}
                                        onChange={(event) => {this.onChangeInput(event, 'lastName') }} 
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Số điện thoại </label>
                                    <input className="form-control" type="text"
                                        value={phoneNumber}
                                        onChange={(event) => {this.onChangeInput(event, 'phoneNumber') }} 
                                    />
                                </div>
                                <div className="col-9">
                                    <label>Địa chỉ </label>
                                    <input className="form-control" type="text"
                                        value={address}
                                        onChange={(event) => {this.onChangeInput(event, 'address') }} 
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Giới tính </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        <option selected>Choose...</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div> 
                                <div className="col-3">
                                    <label>Chức vụ </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'position') }}
                                        value={position}
                                    >
                                        <option selected>Choose...</option>
                                        <option value="Bác sĩ">Bác sĩ</option>
                                        <option value="Thạc sĩ">Thạc sĩ</option>
                                        <option value="Tiến sĩ">Tiến sĩ</option>
                                        <option value="Phó giáo sư">Phó giáo sư</option>
                                        <option value="Giáo sư">Giáo sư</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>Vai trò </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'role') }}
                                        value={role}
                                    >
                                        <option selected>Choose...</option>
                                        <option value="Quản trị viên">Quản trị viên</option>
                                        <option value="Bác sĩ">Bác sĩ</option>
                                        <option value="Bệnh nhân">Bệnh nhân</option>
                                    </select>
                                </div>

                                {/* <div className="col-3">
                                    <label>Giới tính </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'gender') }}
                                    >
                                        {genders && genders.length > 0 && 
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}></option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>Chức danh </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'position') }}
                                    >
                                        {positions && positions.length > 0 && 
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}></option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>Vai trò </label>
                                    <select className="form-control"
                                        onChange={(event) => {this.onChangeInput(event, 'role') }}
                                    >
                                        {roles && roles.length > 0 && 
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}></option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> */}

                                <div className="col-3">
                                    <label>Ảnh đại diện </label>
                                    <div className="preview-img-container">
                                        <input id="previewImg" type="file" hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                        <div className="preview-image"
                                            style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 my-3">
                                    <button
                                        className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => this.handleSaveUser()}
                                    >Lưu user
                                        {/* {this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" />
                                            :
                                            <FormattedMessage id="manage-user.save" />
                                        } */}
                                    </button>
                                </div>

                                <div className="col-12 mb-5">
                                    <TableManageUser 
                                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
