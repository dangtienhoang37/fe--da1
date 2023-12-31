


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './DetailDoctor.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { withRouter } from 'react-router'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';

import { getDetaildoctor } from '../../api/getDetailDoctor';




import BookingModal from './Modal/BookingModal';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            data: {},
            specialist: {},
            alldays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            datasheduletimemodal: {},
            date: '',
            time: '',

        }
    }
    async componentDidMount() {
        const { match } = this.props;
        const { id } = match.params; // Lấy id từ URL
        this.setState({ doctorId: id });

        let { language } = this.props;
        console.log('moment vie: ', moment(new Date()).format('YYYY-MM-DD'));

        let alldays = []
        for (let i = 0; i < 7; i++) {
            let Object = {};
            Object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            Object.value = moment(new Date()).add(i, 'days').startOf('day').format('YYYY-MM-DD');
            console.log('Object: ', Object);
            alldays.push(Object);
        }
        this.setState({
            alldays: alldays,
        })
        getDetaildoctor(id)
            .then(data => {
                this.setState({ data: data });
                this.setState({ specialist: data.specialist });
                // console.log('data: ', data);

            })
            .catch(error => {
                console.log(error);
            });

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }


    handleOnChangeSelect = (event) => {
        const selectedValue = event.target.value; // Đây là giá trị của option đã chọn
        console.log("Selected value:", selectedValue);
        this.setState({
            date: selectedValue
        }, () => {
            // Callback sẽ thực thi sau khi state đã được cập nhật
            console.log('date: ', this.state.date);

        })

        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let doctorId = this.props.match.params.id;
        // }
        // console.log('event onchange date value: ', envent.target.value)

    }
    handleTimeButtonClick = (event) => {
        const selectedTime = event.target.value;

        // Sử dụng giá trị thời gian tương ứng ở đây để thực hiện hành động mong muốn
        console.log('Selected time:', selectedTime);
        // this.setState({ time: selectedTime });
        this.setState({
            time: selectedTime
        }, () => {
            // Callback sẽ thực thi sau khi state đã được cập nhật
            console.log('time: ', this.state.time);
            this.setState({


                isOpenModalBooking: true,

            })
        });



        // ...
    }
    HandleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            datasheduletimemodal: time
        })
        console.log('modal: time: ', time)
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }


    render() {
        // this.doctorInfor();
        // console.log('props: ', this.props);
        // console.log('kiem tra state', this.state);
        let { alldays, allAvailableTime, isOpenModalBooking, datasheduletimemodal } = this.state;
        let { language } = this.props;
        const { data } = this.state;
        // console.log('data: ', data);

        const { specialist } = this.state;
        // console.log('specialist', specialist);


        return (
            <div className="WEB">
                <div className="header">
                    <div className="home-header-container">
                        <div className="home-header-content">
                            <div className="left-content">
                                <div className="logo" onClick={() => this.returnToHome()}><i className="far fa-hospital" ></i>    BỆNH VIỆN A</div>
                            </div>
                            <div className="center-content">
                                <div className="child-content">
                                    <div><b>Chuyên khoa</b></div>
                                    <div className="subs-title">Tìm các bác sĩ theo từng chuyên khoa</div>
                                </div>
                                <div className="child-content">
                                    <div><b>Bác sĩ</b></div>
                                    <div className="subs-title">Tìm các bác sĩ giỏi</div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="support"><i className="fas fa-question-circle"></i>Help</div>
                                <div className="logout">
                                    <span>Đăng xuất</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <img src="https://cdn.bookingcare.vn/fr/w200/2020/03/17/114430-bshung.jpg" className="bacsi">

                            </img>

                        </div>
                        <div className="content-right">
                            <div className="Up">
                                {data.ho_ten}
                                {/* Phó Giáo Sư Nguyễn Văn A */}
                            </div>
                            <div className="Down">Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam</div>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        <div className="content-left">
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                <option value="">Chọn một giá trị</option> {/* Giá trị mặc định */}
                                {alldays && alldays.length > 0 &&
                                    alldays.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>{item.label}</option>

                                        )
                                    })}
                            </select>
                            <div className="all-available-time">
                                <div className="text-calendar">
                                    <i className="fas fa-calendar-alt"> <span>Lịch Khám</span></i>
                                </div>
                                <div className="time-content" >
                                    <div className="a" >
                                        <button value="6:00:00" onClick={this.handleTimeButtonClick}>6:00 - 7:00</button>
                                        <button value="7:00:00" onClick={this.handleTimeButtonClick}>7:00 - 8:00</button>
                                        <button value="8:00:00" onClick={this.handleTimeButtonClick}>8:00 - 9:00</button>
                                        <button value="9:00:00" onClick={this.handleTimeButtonClick}>9:00 - 10:00</button>
                                        <button value="10:00:00" onClick={this.handleTimeButtonClick}>10:00 - 11:00</button>
                                        <button value="11:00:00" onClick={this.handleTimeButtonClick}>11:00 - 12:00</button>
                                        <button value="12:00:00" onClick={this.handleTimeButtonClick}>12:00 - 13:00</button>
                                        <button value="13:00:00" onClick={this.handleTimeButtonClick}>13:00 - 14:00</button>
                                        <button value="14:00:00" onClick={this.handleTimeButtonClick}>14:00 - 15:00</button>
                                    </div>
                                    {/* {allAvailableTime && allAvailableTime.length > 0 &&
                                        allAvailableTime.map((item, index) => {
                                            return (
                                                <button key={index}>{ }</button>
                                            )
                                        })} */}

                                    <div className="book-free">
                                        <span>Chọn <i className="far fa-hand-point-up"></i> và đặt miễn phí</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="doctor-extra-infor-container">
                                <div className="content-up">
                                    <div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
                                    <div className="name-clinic">{specialist.name} </div>
                                    <div className="detail-address"> {data.work_room} - {specialist.address}</div>
                                </div>
                                <div className="content-down">
                                    <div>GIÁ KHÁM: 250.000 VNĐ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        <div className="tt">
                            Phó Giáo sư, Tiến sĩ, Bác sĩ Cao cấp Nguyễn Duy Hưng
                        </div>
                        <div className="a">
                            <li>
                                Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương
                            </li>
                            <li>
                                Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương
                            </li>
                            <li>
                                Đạt chứng chỉ Diploma về Da liễu tại Viện da liễu Băng Cốc - Thái Lan
                            </li>
                            <li>
                                Bác sĩ thường xuyên tham gia các Hội thảo, Hội nghị Quốc tế về Da liễu
                            </li>
                            <li>
                                Hội viên của Hội Da liễu Đông Nam Á, Châu Á và Thế giới
                            </li>
                            <li>
                                Giảng viên bộ môn Da liễu tại Đại Học Y Hà Nội
                            </li>
                            <li>
                                Trưởng Bộ môn Da liễu, Trường Đại học Kinh doanh và Công nghệ
                            </li>
                            <li>
                                Tốt nghiệp Đại học Y Hà Nội (1977)
                            </li>
                            <li>
                                Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam
                            </li>

                        </div>
                        <div className="b">
                            Phó Giáo sư khám và điều trị
                        </div>
                        <div className="c">
                            <li>
                                Trứng cá thông thường thanh thiếu niên, người lớn, trứng cá do thuốc, mỹ phẩm, do bôi corticord, các thể bệnh trứng cá nặng, trứng cá đỏ (rosacea)
                            </li>
                            <li>
                                Điều trị da phục hồi da tổn hại do trứng cá, sẹo trứng cá
                            </li>
                            <li>
                                Các bệnh lý da mặt: viêm da dị ứng, tổn hại da do sử dụng mỹ phẩm, do corticord, lão hóa da
                            </li>
                            <li>
                                Nám da, tàn nhang, sạm da, các bệnh da tăng sắc tố sau viêm, sau trứng cá, do mỹ phẩm
                            </li>
                            <li>
                                Viêm da dị ứng, viêm da tiếp xúc, viêm da dầu
                            </li>
                        </div>
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    datatime={datasheduletimemodal}
                    time={this.state.time}
                    date={this.state.date} >

                </BookingModal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //     navigate: (path) => dispatch(push(path)),
        //     // userDetailDoctorFail: () => dispatch(actions.adminDetailDoctorFail()),
        //     userDetailDoctorSuccess: (userInfo) => dispatch(actions.userDetailDoctorSuccess(userInfo))
        // };


    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
