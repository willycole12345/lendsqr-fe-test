import axios from 'axios';
import moment from 'moment';
import { forwardRef, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

import { activeUser, blackList, eyes, moreDetails, userIcon } from '../images';
import { UserInterface } from '../types';

const status = [
    { color: 'success', label: 'active' },
    { color: 'secondary', label: 'inactive' },
    { color: 'warning', label: 'pending' },
    { color: 'danger', label: 'blacklisted' }
];
const MoreToggle = forwardRef(({ onClick }: any, ref: any) => (
    <img
        className="px-3 py-1"
        src={moreDetails}
        alt="logo"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

function UserListing() {
    const [records, setRecords] = useState<any[]>([]),
        [pending, setPending] = useState(true),
        navigate = useNavigate();

    const getRecords = async () => {
            try {
                const res = await axios.get(`${API_URL}/v1/users`);
                setRecords(res.data);
                setPending(false);
            } catch (error) {}
        },
        onViewDetails = (user: UserInterface) => {
            localStorage.setItem(`currUser`, JSON.stringify(user));
            navigate(`/users/${user.id}`);
        };

    useEffect(() => {
        getRecords();
    }, []);
    return (
        <>
            <DataTable
                customStyles={{
                    rows: {
                        style: {
                            minHeight: '72px', // override the row height
                        },
                    },
                    headCells: {
                        style: {
                            color:'#213F7D',
                            fontFamily: 'Work Sans',
                          fontSize: '12px',
                          fontWeight: '600',
                          lineHeight: '14px',
                          letterSpacing: '0em',
                          textAlign:'left',
                        },
                    },
                    cells: {
                        style: {
                             fontFamily:'Work Sans !important',
                              fontSize:'14px !important',
                              fontWeight: '400 !important',
                              lineHeight: '16px !important',
                              letterSpacing: '0px !important',
                              textAlign: 'left !important',
                              color:'#213F7D !important',
                        },
                    },
                }}
                columns={[
                    {
                        sortable: true,
                        name: 'Organization'.toLocaleUpperCase(),
                        selector: (row: UserInterface) => row.orgName
                    },
                    {
                        sortable: true,
                        name: 'Username'.toLocaleUpperCase(),
                        selector: (row: UserInterface) => row.userName
                    },
                    {
                        sortable: true,
                        name: 'Email'.toLocaleUpperCase(),
                        selector: (row: UserInterface) => row.email
                    },
                    {
                        sortable: true,
                        name: 'Phonenumber'.toLocaleUpperCase(),
                        selector: (row: UserInterface) => row.phoneNumber
                    },
                    {
                        sortable: true,
                        name: 'Data Joined'.toLocaleUpperCase(),
                        selector: (row: UserInterface) => row.createdAt
                    },
                    { name: 'Status'.toLocaleUpperCase(), selector: (row: UserInterface & { status: any }) => row.status(), width: '100px' },
                    { name: '', selector: (row: UserInterface & { status: any; action: any }) => row.action(), width: '80px', button: true, wrap: false, allowOverflow: true }
                ]}
                data={records.map((_) => {
                    const _status = status[Math.floor(Math.random() * 4)];
                    return {
                        ..._,
                        createdAt: moment(_.createdAt).format('MMMM Do YYYY, h:mm a'),
                        status: () => <span className={`badge rounded-pill bg-${_status.color} text-${_status.color} bg-opacity-10 p-2`}>{_status.label}</span>,
                        action: () => (
                            <Dropdown>
                                <Dropdown.Toggle as={MoreToggle} variant="transparent" id={`dropdown-${_.id}`} />
                                <Dropdown.Menu>
                                    <div role={'button'} onClick={() => onViewDetails(_)} className="d-block  py-2 px-1">
                                        <img width={10} src={eyes} alt="userpro" className="mx-2" />
                                        <small>View details</small>
                                    </div>
                                    <div className="d-block py-2 px-1">
                                        <img width={10} src={blackList} alt="userpro" className="mx-2" />
                                        <small>Blacklist User</small>
                                    </div>
                                    <div className="d-block py-2 px-1">
                                        <img width={10} src={activeUser} alt="userpro" className="mx-2" />
                                        <small>Activate User</small>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    };
                })}
                pagination
                progressPending={pending}
            />
        </>
    );
}
export default UserListing;
