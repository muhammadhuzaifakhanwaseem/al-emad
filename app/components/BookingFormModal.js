import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Alert, TextField } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useLoading } from '../context/LoadingContext';
import Modal from '@mui/material/Modal';

import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '14px',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const steps = [
  {
    index: 0,
    label: 'Choose Dates'
  },
  {
    index: 1,
    label: 'Personal Information'
  },
  {
    index: 2,
    label: 'Documents'
  },
];


export default function BookingFormModal({ carName, carModel, carId, carSlug }) {

  const { setLoading } = useLoading();

  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [succesResponse, setSuccesResponse] = React.useState('');
  const [fileInputs, setFileInputs] = React.useState({
    resident_passport: null,
    resident_license: null,
    resident_id: null,
    tourist_passport: null,
    tourist_license: null,
    tourist_id: null,
  });

  const router = useRouter();

  const redirectToHome = () => {
    router.push('/', { state: { 'car': 1 } });
  };

  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    start_date: dayjs('2025-02-10'),
    end_date: dayjs('2025-02-20'),
  });

  const handleNext = () => {
    if (activeStep === 0) {
      // Step 1: Validate start_date and end_date
      const today = dayjs();
      if (!formData.start_date || !formData.end_date) {
        alert("Please select both Start Date and End Date.");
        return;
      }
      if (formData.start_date.isBefore(today, 'day')) {
        alert("Start Date should be a future date.");
        return;
      }
      if (formData.end_date.isBefore(formData.start_date, 'day')) {
        alert("End Date should be after the Start Date.");
        return;
      }
    }

    if (activeStep === 1) {
      // Step 2: Validate personal information fields
      const { full_name, email, phone, address } = formData;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!full_name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
        alert("All fields are required.");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (phone.trim().length < 10) {
        alert("Please enter a valid contact number.");
        return;
      }
    }

    if (activeStep === 2) {
      // Step 3: Validate resident/tourist option and file uploads
      if (!selectedOption) {
        alert("Please select whether you are a Resident or a Tourist.");
        return;
      }

      if (selectedOption === "resident") {
        if (!fileInputs.resident_passport || !fileInputs.resident_license || !fileInputs.resident_id) {
          alert("Please upload all required documents for Residents.");
          return;
        }
      } else if (selectedOption === "tourist") {
        if (!fileInputs.tourist_passport || !fileInputs.tourist_license || !fileInputs.tourist_id) {
          alert("Please upload all required documents for Tourists.");
          return;
        }
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event, field) => {
    setFileInputs({ ...fileInputs, [field]: event.target.files[0] });
  };

  const [userData, setUserData] = React.useState()
  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('auth')))
  }, []);

  const [responseMessage, setResponseMessage] = React.useState()

  const handleSubmit = async () => {
    setResponseMessage("");
    const form = new FormData();
    form.append('full_name', formData.full_name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('address', formData.address);
    form.append('resident_or_tourist', selectedOption);
    form.append('start_date', formData.start_date.format('YYYY-MM-DD'));
    form.append('end_date', formData.end_date.format('YYYY-MM-DD'));
    form.append('car_id', carId);
    form.append('slug', carSlug);
    form.append('user_id', userData?.user_info?.id);

    // Add file data if available
    if (selectedOption === 'resident') {
      form.append("resident_passport", fileInputs.resident_passport);
      form.append("resident_license", fileInputs.resident_license);
      form.append("resident_id", fileInputs.resident_id);
    } else if (selectedOption === 'tourist') {
      form.append("tourist_passport", fileInputs.tourist_passport);
      form.append("tourist_license", fileInputs.tourist_license);
      form.append("tourist_id", fileInputs.tourist_id);
    }

    form.append('updated_at', dayjs().format('YYYY-MM-DD'));

    const requestOptions = {
      method: "POST",
      body: form,
      redirect: "follow",
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await fetch("/api/car/booking", requestOptions);
      const result = await response.json();
      setResponseMessage(result?.message?.success);
      if (result?.data?.submit_status == true) {
        setSuccesResponse(result)
        setTimeout(() => {
          setResponseMessage("");
        }, 5000);
        setOpenSuccessModal(true)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    redirectToHome()
  }

  return (
    <>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <div className="p-2 rounded position-fixed top-0 end-0 m-3">
          {responseMessage && responseMessage.map((item, index) => (
            <Alert className="mb-2" severity="info" key={index}>{item}</Alert>
          ))}
        </div>
        <Paper square elevation={0} sx={{ display: 'flex', alignItems: 'center', height: 50, pl: 2, bgcolor: 'background.default' }}>
          <Typography>{steps[activeStep]?.label}</Typography>
        </Paper>
        <Box sx={{ height: '100%', maxWidth: '600px', width: 'max-content', p: 2 }}>
          {activeStep === 0 && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Start Date</label>
                  <DatePicker
                    value={formData.start_date}
                    onChange={(newValue) => setFormData({ ...formData, start_date: newValue })}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">End Date</label>
                  <DatePicker
                    value={formData.end_date}
                    onChange={(newValue) => setFormData({ ...formData, end_date: newValue })}
                  />
                </div>
              </div>
            </LocalizationProvider>
          )}
          {activeStep === 1 && (
            <div className="row">
              <TextField
                required
                label="Your Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Your Contact Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                label="Your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                required
                label="Your Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          )}
          {activeStep === 2 && (
            <div className="row">
              <FormControl>
                <FormLabel>Are you a resident or a tourist?</FormLabel>
                <RadioGroup row value={selectedOption} onChange={handleRadioChange}>
                  <FormControlLabel value="resident" control={<Radio />} label="Resident" />
                  <FormControlLabel value="tourist" control={<Radio />} label="Tourist" />
                </RadioGroup>
              </FormControl>

              {selectedOption === 'resident' && (
                <div className='row mt-4'>
                  <div className='col-lg-6 mb-3'>
                    <Button
                      component="label"
                      variant="outlined"
                      size='small'
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      Passport Copy
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'resident_passport')}
                        hidden
                      />
                    </Button>
                  </div>
                  <div className='col-lg-6 mb-3'>
                    <Button
                      component="label"
                      variant="outlined"
                      size='small'
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      Driving License
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'resident_license')}
                        hidden
                      />
                    </Button>
                  </div>
                  <div className='col-lg-6 mb-3'>
                    <Button
                      component="label"
                      variant="outlined"
                      size='small'
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      Emirates ID
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'resident_id')}
                        hidden
                      />
                    </Button>
                  </div>
                  <div className='col-lg-6 mb-3'>
                    <Button size='small' variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                  </div>
                </div>
              )}

              {selectedOption === 'tourist' && (
                <>
                  <div className='row mt-4'>
                    <div className='col-lg-6 mb-3'>
                      <Button
                        component="label"
                        variant="outlined"
                        size='small'
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                      >
                        Passport Copy
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, 'tourist_passport')}
                          hidden
                        />
                      </Button>
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <Button
                        component="label"
                        variant="outlined"
                        size='small'
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                      >
                        International License
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, 'tourist_license')}
                          hidden
                        />
                      </Button>
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <Button
                        component="label"
                        variant="outlined"
                        size='small'
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                      >
                        Visa/Stamp
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, 'tourist_id')}
                          hidden
                        />
                      </Button>
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <Button size='small' variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </Box>
        <MobileStepper
          className='position-relative'
          steps={3}
          activeStep={activeStep}
          nextButton={
            activeStep !== 2 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button disabled>Next</Button>
            )
          }
          backButton={<Button onClick={handleBack}>Back</Button>}
        />
      </Box>
      <div>
        <Modal
          open={openSuccessModal}
          onClose={handleCloseSuccessModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Booking Submitted Successfully
            </Typography>
            <hr />
            <div className='table-responsive'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr key="1">
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Car Name</th>
                    <th>Model</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key="1">
                    <td>{succesResponse?.data?.data?.full_name}</td>
                    <td>{succesResponse?.data?.data?.email}</td>
                    <td>{succesResponse?.data?.data?.phone}</td>
                    <td>{succesResponse?.data?.data?.address}</td>
                    <td>{succesResponse?.data?.data?.start_date}</td>
                    <td>{succesResponse?.data?.data?.end_date}</td>
                    <td>{carName}</td>
                    <td>{carModel}</td>
                    <td><div className='badge bg-warning p-2 rounded'>Pending</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

