'use client';

import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Radio,
    DatePicker,
    Button,
    Table,
    Space,
    Card,
    Row,
    Col,
    Typography,
    Popconfirm,
    message,
    Checkbox,
} from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import styles from './style.module.scss';

// Import from new store structure
import { store, RootState } from '../../store';
import {
    addItem,
    updateItem,
    deleteItem,
    deleteSelected,
    setEditingId,
    loadMockDataAction,
    clearAllData
} from '../../store/slices/formSlice';

// Import mock data
import { FormData } from './mockData';

const { Title } = Typography;
const { Option } = Select;

// Define types
interface FormValues {
    title?: string;
    firstname?: string;
    lastname?: string;
    birthday?: Dayjs;
    nationality?: string;
    citizenId?: string;
    gender?: string;
    mobilePhone?: string;
    phonePrefix?: string;
    passportNo?: string;
    expectedSalary?: string;
    idType?: 'citizen' | 'passport';
}

interface PhonePrefixOption {
    value: string;
    label: string;
    flag: string;
}

interface TitleOption {
    value: string;
    label: string;
}

interface NationalityOption {
    value: string;
    label: string;
}

// Custom hook for localStorage management
const useLocalStorage = () => {
    const items = useSelector((state: RootState) => state.form.items);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('formData', JSON.stringify(items));
            } catch (error) {
                console.error('Error saving data to localStorage:', error);
            }
        }
    }, [items]);
};

// Data Management Component
const DataManagement: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.form.items);
    const { t } = useTranslation();

    const handleLoadMockData = () => {
        dispatch(loadMockDataAction());
        message.success(t('form.messages.mockDataLoaded') || 'Mock data loaded successfully!');
    };

    const handleClearAllData = () => {
        dispatch(clearAllData());
        message.success(t('form.messages.allDataCleared') || 'All data cleared successfully!');
    };

    return (
        <Card className={styles.dataManagementCard} style={{ marginBottom: 16 }}>
            <Space>
                <Button
                    type="default"
                    onClick={handleLoadMockData}
                    disabled={items.length > 0}
                >
                    {t('form.loadMockData') || 'Load Mock Data (20 users)'}
                </Button>
                <Button
                    danger
                    onClick={handleClearAllData}
                    disabled={items.length === 0}
                >
                    {t('form.clearAllData') || 'Clear All Data'}
                </Button>
                <span style={{ color: '#666' }}>
                    {t('form.currentDataCount') || 'Current records'}: {items.length}
                </span>
            </Space>
        </Card>
    );
};

// Form Component
const FormComponent: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { editingId, items } = useSelector((state: RootState) => state.form);
    const { t, i18n } = useTranslation();

    const [citizenIdParts, setCitizenIdParts] = useState<string[]>(['', '', '', '', '']);
    const [idType, setIdType] = useState<'citizen' | 'passport'>('citizen');
    const [phonePrefix, setPhonePrefix] = useState<string>('+66');

    // Check if current language is Thai
    const isThaiLanguage = i18n.language === 'th';

    // Phone prefix options
    const phonePrefixOptions: PhonePrefixOption[] = [
        { value: '+66', label: '+66 (Thailand)', flag: '🇹🇭' },
        { value: '+1', label: '+1 (USA/Canada)', flag: '🇺🇸' },
        { value: '+44', label: '+44 (UK)', flag: '🇬🇧' },
        { value: '+81', label: '+81 (Japan)', flag: '🇯🇵' },
        { value: '+86', label: '+86 (China)', flag: '🇨🇳' },
        { value: '+33', label: '+33 (France)', flag: '🇫🇷' },
        { value: '+49', label: '+49 (Germany)', flag: '🇩🇪' },
        { value: '+65', label: '+65 (Singapore)', flag: '🇸🇬' },
        { value: '+60', label: '+60 (Malaysia)', flag: '🇲🇾' },
        { value: '+62', label: '+62 (Indonesia)', flag: '🇮🇩' },
        { value: '+965', label: '+965 (Kuwait)', flag: '🇰🇼' },
        { value: '+91', label: '+91 (India)', flag: '🇮🇳' },
    ];

    useEffect(() => {
        if (editingId) {
            const item = items.find(item => item.id === editingId);
            if (item) {
                const parts = item.citizenId ? item.citizenId.split('-') : ['', '', '', '', ''];
                setCitizenIdParts(parts);
                setIdType(item.idType || 'citizen');
                setPhonePrefix(item.phonePrefix || '+66');

                form.setFieldsValue({
                    ...item,
                    birthday: item.birthday ? dayjs(item.birthday) : null,
                    expectedSalary: item.expectedSalary ? Number(item.expectedSalary).toLocaleString() : undefined,
                    idType: item.idType || 'citizen',
                    phonePrefix: item.phonePrefix || '+66',
                });
            }
        }
    }, [editingId, items, form]);

    const handleCitizenIdChange = (index: number, value: string) => {
        const maxLengths = [1, 4, 5, 2, 1];
        const newValue = value.replace(/\D/g, '').slice(0, maxLengths[index]);

        const newParts = [...citizenIdParts];
        newParts[index] = newValue;
        setCitizenIdParts(newParts);

        const filledParts = [];
        for (let i = 0; i < newParts.length; i++) {
            if (newParts[i]) {
                filledParts.push(newParts[i]);
            } else {
                break;
            }
        }
        const citizenId = filledParts.join('-');
        form.setFieldValue('citizenId', citizenId);

        form.validateFields(['citizenId']);

        if (newValue.length === maxLengths[index] && index < 4) {
            const nextInput = document.querySelector(`[data-citizen-id-index="${index + 1}"]`) as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleIdTypeChange = (value: 'citizen' | 'passport') => {
        setIdType(value);
        if (value === 'citizen') {
            form.setFieldValue('passportNo', '');
        } else {
            form.setFieldValue('citizenId', '');
            setCitizenIdParts(['', '', '', '', '']);
        }
        form.validateFields(['citizenId', 'passportNo']);
    };

    const handlePhonePrefixChange = (value: string) => {
        setPhonePrefix(value);
        form.setFieldValue('phonePrefix', value);
    };

    const validateCitizenId = () => {
        const fullCitizenId = citizenIdParts.join('').replace(/\D/g, '');
        return fullCitizenId.length === 13;
    };

    const handleSubmit = (values: FormValues) => {
        const filledParts = citizenIdParts.filter(part => part.trim() !== '');
        const citizenId = filledParts.join('-');

        const newItem: FormData = {
            id: editingId || Date.now().toString(),
            title: values.title || '',
            firstname: values.firstname || '',
            lastname: values.lastname || '',
            birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : '',
            nationality: values.nationality || '',
            citizenId: idType === 'citizen' ? citizenId : '',
            gender: (values.gender as 'Male' | 'Female' | 'Unisex') || 'Male',
            mobilePhone: values.mobilePhone || '',
            phonePrefix: phonePrefix,
            passportNo: idType === 'passport' ? (values.passportNo || '') : '',
            expectedSalary: values.expectedSalary ? values.expectedSalary.replace(/,/g, '') : '',
            idType: idType,
        };

        if (editingId) {
            dispatch(updateItem(newItem));
            message.success(t('form.messages.updateSuccess') || 'Updated successfully!');
        } else {
            dispatch(addItem(newItem));
            message.success(t('form.messages.saveSuccess') || 'Saved successfully!');
        }

        handleReset();
    };

    const handleReset = () => {
        form.resetFields();
        setCitizenIdParts(['', '', '', '', '']);
        setIdType('citizen');
        setPhonePrefix('+66');
        dispatch(setEditingId(null));
    };

    // Get title options based on language
    const getTitleOptions = (): TitleOption[] => {
        if (isThaiLanguage) {
            return [
                { value: 'นาย', label: t('form.form.titles.mr') || 'นาย' },
                { value: 'นาง', label: t('form.form.titles.mrs') || 'นาง' },
                { value: 'นางสาว', label: t('form.form.titles.ms') || 'นางสาว' },
            ];
        } else {
            return [
                { value: 'Mr.', label: t('form.form.titles.mr') || 'Mr.' },
                { value: 'Mrs.', label: t('form.form.titles.mrs') || 'Mrs.' },
                { value: 'Ms.', label: t('form.form.titles.ms') || 'Ms.' },
            ];
        }
    };

    // Get nationality options based on language
    const getNationalityOptions = (): NationalityOption[] => {
        if (isThaiLanguage) {
            return [
                { value: 'ไทย', label: t('form.form.nationalities.thai') || 'ไทย' },
                { value: 'อเมริกัน', label: t('form.form.nationalities.american') || 'อเมริกัน' },
                { value: 'อังกฤษ', label: t('form.form.nationalities.british') || 'อังกฤษ' },
                { value: 'จีน', label: t('form.form.nationalities.chinese') || 'จีน' },
                { value: 'ญี่ปุ่น', label: t('form.form.nationalities.japanese') || 'ญี่ปุ่น' },
                { value: 'อื่นๆ', label: t('form.form.nationalities.other') || 'อื่นๆ' },
            ];
        } else {
            return [
                { value: 'Thai', label: t('form.form.nationalities.thai') || 'Thai' },
                { value: 'American', label: t('form.form.nationalities.american') || 'American' },
                { value: 'British', label: t('form.form.nationalities.british') || 'British' },
                { value: 'Chinese', label: t('form.form.nationalities.chinese') || 'Chinese' },
                { value: 'Japanese', label: t('form.form.nationalities.japanese') || 'Japanese' },
                { value: 'Other', label: t('form.form.nationalities.other') || 'Other' },
            ];
        }
    };

    return (
        <Card className={styles.formCard}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            label={t('form.form.title') || 'Title'}
                            name="title"
                            rules={[{ required: true, message: t('form.form.validations.titleRequired') || 'Please select title!' }]}
                        >
                            <Select placeholder={t('form.form.placeholders.selectTitle') || 'Select title'} allowClear>
                                {getTitleOptions().map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Form.Item
                            label={t('form.form.firstName') || 'First Name'}
                            name="firstname"
                            rules={[{ required: true, message: t('form.form.validations.firstNameRequired') || 'Please enter first name!' }]}
                        >
                            <Input
                                placeholder={t('form.form.placeholders.enterFirstName') || 'Enter first name'}
                                onKeyPress={(e) => {
                                    if (!/[a-zA-Zก-๙\s]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Form.Item
                            label={t('form.form.lastName') || 'Last Name'}
                            name="lastname"
                            rules={[{ required: true, message: t('form.form.validations.lastNameRequired') || 'Please enter last name!' }]}
                        >
                            <Input
                                placeholder={t('form.form.placeholders.enterLastName') || 'Enter last name'}
                                onKeyPress={(e) => {
                                    if (!/[a-zA-Zก-๙\s]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label={t('form.form.birthday') || 'Birthday'}
                            name="birthday"
                            rules={[{ required: true, message: t('form.form.validations.birthdayRequired') || 'Please select birthday!' }]}
                        >
                            <DatePicker
                                placeholder={t('form.form.placeholders.selectBirthday') || 'Select birthday'}
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            label={t('form.form.nationality') || 'Nationality'}
                            name="nationality"
                            rules={[{ required: true, message: t('form.form.validations.nationalityRequired') || 'Please select nationality!' }]}
                        >
                            <Select placeholder={t('form.form.placeholders.selectNationality') || 'Select nationality'} allowClear>
                                {getNationalityOptions().map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={isThaiLanguage ? "ประเภทเอกสาร" : "Document Type"}
                            name="idType"
                            initialValue="citizen"
                        >
                            <Radio.Group
                                value={idType}
                                onChange={(e) => handleIdTypeChange(e.target.value)}
                            >
                                <Radio value="citizen">
                                    {isThaiLanguage ? "เลขบัตรประจำตัวประชาชน (สำหรับคนไทย)" : "Citizen ID (For Thai citizens)"}
                                </Radio>
                                <Radio value="passport">
                                    {isThaiLanguage ? "เลขหนังสือเดินทาง (สำหรับต่างชาติ)" : "Passport Number (For foreigners)"}
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                {idType === 'citizen' && (
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label={t('form.form.citizenId') || 'Citizen ID'}
                                name="citizenId"
                                rules={[
                                    { required: true, message: t('form.form.validations.citizenIdRequired') || 'Please enter citizen ID!' },
                                    {
                                        validator: () => {
                                            if (validateCitizenId()) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(t('form.form.validations.citizenIdInvalid') || 'Invalid citizen ID format!'));
                                        }
                                    }
                                ]}
                            >
                                <div className={styles.citizenIdContainer}>
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <React.Fragment key={index}>
                                            <Input
                                                data-citizen-id-index={index}
                                                value={citizenIdParts[index]}
                                                onChange={(e) => handleCitizenIdChange(index, e.target.value)}
                                                className={styles.citizenIdInput}
                                                maxLength={index === 0 || index === 4 ? 1 : index === 1 ? 4 : index === 2 ? 5 : 2}
                                                placeholder={index === 0 ? '0' : index === 4 ? '0' : index === 1 ? '0000' : index === 2 ? '00000' : '00'}
                                                style={{
                                                    width: index === 0 || index === 4 ? '50px' : index === 1 ? '80px' : index === 2 ? '100px' : '60px',
                                                    textAlign: 'center'
                                                }}
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                    }
                                                    if (e.key === 'Backspace' && citizenIdParts[index] === '' && index > 0) {
                                                        const prevInput = document.querySelector(`[data-citizen-id-index="${index - 1}"]`) as HTMLInputElement;
                                                        if (prevInput) {
                                                            prevInput.focus();
                                                        }
                                                    }
                                                }}
                                            />
                                            {index < 4 && <span className={styles.citizenIdDash}>-</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                {idType === 'passport' && (
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label={t('form.form.passportNo') || 'Passport Number'}
                                name="passportNo"
                                rules={[
                                    { required: true, message: isThaiLanguage ? 'กรุณากรอกเลขหนังสือเดินทาง' : 'Please enter passport number!' },
                                    {
                                        pattern: /^[A-Z0-9]{6,9}$/,
                                        message: t('form.form.validations.passportInvalid') || 'Invalid passport format!'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder={t('form.form.placeholders.enterPassport') || 'Enter passport number'}
                                    style={{ textTransform: 'uppercase' }}
                                    onKeyPress={(e) => {
                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.toUpperCase();
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={t('form.form.gender') || 'Gender'}
                            name="gender"
                            initialValue="Male"
                            rules={[{ required: true, message: t('form.form.validations.genderRequired') || 'Please select gender!' }]}
                        >
                            <Radio.Group>
                                <Radio value="Male">{t('form.form.male') || 'Male'}</Radio>
                                <Radio value="Female">{t('form.form.female') || 'Female'}</Radio>
                                <Radio value="Unisex">{t('form.form.unisex') || 'Unisex'}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={t('form.form.mobilePhone') || 'Mobile Phone'}
                            required
                        >
                            <div className={styles.phoneContainer}>
                                <Form.Item
                                    name="phonePrefix"
                                    initialValue="+66"
                                    noStyle
                                >
                                    <Select
                                        style={{ width: 140 }}
                                        value={phonePrefix}
                                        onChange={handlePhonePrefixChange}
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {phonePrefixOptions.map(option => (
                                            <Option key={option.value} value={option.value}>
                                                <span style={{ marginRight: 8 }}>{option.flag}</span>
                                                {option.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="mobilePhone"
                                    rules={[
                                        { required: true, message: t('form.form.validations.mobilePhoneRequired') || 'Please enter mobile phone!' },
                                        {
                                            pattern: /^[0-9]{8,10}$/,
                                            message: t('form.form.validations.mobilePhoneInvalid') || 'Invalid phone format!'
                                        }
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        type="tel"
                                        placeholder={t('form.form.placeholders.enterPhone') || 'Enter phone number'}
                                        style={{ flex: 1 }}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={t('form.form.expectedSalary') || 'Expected Salary'}
                            name="expectedSalary"
                            rules={[
                                { required: true, message: t('form.form.validations.expectedSalaryRequired') || 'Please enter expected salary!' },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        const numValue = parseInt(value.replace(/,/g, ''));
                                        if (isNaN(numValue) || numValue <= 0) {
                                            return Promise.reject(new Error(t('form.form.validations.expectedSalaryInvalid') || 'Invalid salary amount!'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input
                                placeholder={t('form.form.placeholders.enterSalary') || 'Enter expected salary'}
                                style={{ width: '100%' }}
                                suffix={t('common.currency') || 'THB'}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    e.target.value = formattedValue;
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div className={styles.buttonContainer}>
                    <Button size="large" onClick={handleReset}>
                        {t('form.form.cancel') || 'Cancel'}
                    </Button>
                    <Button type="primary" htmlType="submit" size="large">
                        {editingId ? (t('form.form.edit') || 'Update') : (t('form.form.save') || 'Save')}
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

// Table Component
const TableComponent: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.form.items);
    const { t, i18n } = useTranslation();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const isThaiLanguage = i18n.language === 'th';

    const handleEdit = (record: FormData) => {
        dispatch(setEditingId(record.id));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteItem(id));
        message.success(t('form.messages.deleteSuccess') || 'Deleted successfully!');
        setSelectedRowKeys(prev => prev.filter(key => key !== id));
    };

    const handleBulkDelete = () => {
        if (selectedRowKeys.length === 0) return;

        dispatch(deleteSelected(selectedRowKeys as string[]));
        message.success(t('form.messages.bulkDeleteSuccess') || `Deleted ${selectedRowKeys.length} items successfully!`);
        setSelectedRowKeys([]);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
        onSelectAll: (selected: boolean) => {
            if (selected) {
                const newKeys = items.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => item.id);
                setSelectedRowKeys([...selectedRowKeys, ...newKeys]);
            } else {
                const pageKeys = items.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => item.id);
                setSelectedRowKeys(selectedRowKeys.filter(key => !pageKeys.includes(key as string)));
            }
        },
    };

    const columns = [
        {
            title: t('form.table.name') || 'Name',
            key: 'name',
            render: (record: FormData) => `${record.title} ${record.firstname} ${record.lastname}`.trim(),
            width: 200,
        },
        {
            title: t('form.table.gender') || 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 80,
            render: (gender: string) => {
                const genderMap = {
                    Male: t('form.form.male') || 'Male',
                    Female: t('form.form.female') || 'Female',
                    Unisex: t('form.form.unisex') || 'Unisex'
                };
                return genderMap[gender as keyof typeof genderMap] || gender;
            },
        },
        {
            title: t('form.table.phone') || 'Phone',
            key: 'phone',
            width: 150,
            render: (record: FormData) => {
                const prefix = record.phonePrefix || '+66';
                const phone = record.mobilePhone || '';
                return phone ? `${prefix} ${phone}` : '-';
            },
        },
        {
            title: t('form.table.nationality') || 'Nationality',
            dataIndex: 'nationality',
            key: 'nationality',
            width: 100,
        },
        {
            title: isThaiLanguage ? 'เอกสาร' : 'Document',
            key: 'document',
            width: 150,
            render: (record: FormData) => {
                if (record.idType === 'passport' || record.passportNo) {
                    return `${isThaiLanguage ? 'หนังสือเดินทาง' : 'Passport'}: ${record.passportNo}`;
                }
                return `${isThaiLanguage ? 'บัตรประชาชน' : 'ID'}: ${record.citizenId}`;
            },
        },
        {
            title: t('form.table.actions') || 'Actions',
            key: 'action',
            width: 120,
            render: (record: FormData) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        {t('form.form.edit') || 'Edit'}
                    </Button>
                    <Popconfirm
                        title={t('form.confirmDelete') || 'Are you sure you want to delete this item?'}
                        onConfirm={() => handleDelete(record.id)}
                        okText={t('common.yes') || 'Yes'}
                        cancelText={t('common.no') || 'No'}
                    >
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                        >
                            {t('form.form.delete') || 'Delete'}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card className={styles.tableCard}>
            <div className={styles.bulkActions}>
                <Checkbox
                    checked={selectedRowKeys.length > 0 && selectedRowKeys.length === items.slice((currentPage - 1) * pageSize, currentPage * pageSize).length}
                    indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < items.slice((currentPage - 1) * pageSize, currentPage * pageSize).length}
                    onChange={(e) => {
                        if (e.target.checked) {
                            const pageKeys = items.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => item.id);
                            setSelectedRowKeys([...selectedRowKeys, ...pageKeys]);
                        } else {
                            const pageKeys = items.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => item.id);
                            setSelectedRowKeys(selectedRowKeys.filter(key => !pageKeys.includes(key as string)));
                        }
                    }}
                >
                    {t('form.form.selectAll') || 'Select All'}
                </Checkbox>

                <Popconfirm
                    title={t('form.confirmBulkDelete') || `Are you sure you want to delete ${selectedRowKeys.length} items?`}
                    onConfirm={handleBulkDelete}
                    disabled={selectedRowKeys.length === 0}
                    okText={t('common.yes') || 'Yes'}
                    cancelText={t('common.no') || 'No'}
                >
                    <Button
                        disabled={selectedRowKeys.length === 0}
                        icon={<DeleteOutlined />}
                    >
                        {t('form.form.deleteSelected') || 'Delete Selected'} ({selectedRowKeys.length})
                    </Button>
                </Popconfirm>
            </div>

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={items}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: items.length,
                    onChange: (page) => {
                        setCurrentPage(page);
                        setSelectedRowKeys([]);
                    },
                    showSizeChanger: false,
                    showQuickJumper: false,
                    showTotal: (total, range) =>
                        t('form.table.showTotal', { 
                            range0: range[0], 
                            range1: range[1], 
                            total: total 
                        }),
                    className: styles.pagination,
                }}
                locale={{
                    emptyText: t('form.table.noData') || 'No data available',
                }}
            />
        </Card>
    );
};

// Main App Component
const App: React.FC = () => {
    const router = useRouter();
    const { t, ready } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useLocalStorage();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGoBack = () => {
        router.push('/');
    };

    // Show loading state if not ready
    if (!ready || !mounted) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={handleGoBack}
                        size="large"
                        className={styles.backButton}
                        loading
                    >
                        Back to Home
                    </Button>
                    <Title level={1} className={styles.title}>
                        User Form Management
                    </Title>
                </div>

                <div className={styles.content}>
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleGoBack}
                    size="large"
                    className={styles.backButton}
                >
                    {t('form.backToHome') || 'Back to Home'}
                </Button>
                <Title level={1} className={styles.title}>
                    {t('form.title') || 'User Form Management'}
                </Title>
            </div>

            <div className={styles.content}>
                <DataManagement />
                <FormComponent />
                <TableComponent />
            </div>
        </div>
    );
};

// Root Component with Provider
const FormPage: React.FC = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default FormPage;