import { render, screen } from '@testing-library/react-native';
import { fireEvent } from '@testing-library/react-native';
import MaklumatProfil from './MaklumatProfil';
import axios from 'axios';
import { waitFor } from '@testing-library/react-native';

test('renders registration page without crashing', () => {
  render(<MaklumatProfil />);
  // Check if the title is rendered
  expect(screen.getByText('Maklumat Diri')).toBeInTheDocument();
  // Check if the Kemaskini button is rendered
  expect(screen.getByText('Kemaskini')).toBeInTheDocument();
  // Check if registerStatus is not shown initially
  expect(screen.queryByText(/Sila lengkapkan semua medan/)).toBeNull();
  expect(screen.queryByText(/Nombor telefon mestilah lebih daripada 9 digit dengan atau tanpa \+6/)).toBeNull();
  expect(screen.queryByText(/Bandar mesti bermula dengan huruf besar/)).toBeNull();
  expect(screen.queryByText(/Negeri mesti bermula dengan huruf besar/)).toBeNull();
  expect(screen.queryByText(/Sila masukkan alamat emel yang sah/)).toBeNull();
});


test('shows error messages for incomplete form submission', () => {
  render(<MaklumatProfil />);
  const kemaskiniButton = screen.getByText('Kemaskini');
  fireEvent.press(kemaskiniButton);
  expect(screen.getByText(/Sila lengkapkan semua medan/)).toBeInTheDocument();
});

test('shows error message for invalid phone number', () => {
  render(<MaklumatProfil />);
  const phoneNumberInput = screen.getByPlaceholderText('No. Telefon');
  fireEvent.changeText(phoneNumberInput, '12345678');
  const kemaskiniButton = screen.getByText('Kemaskini');
  fireEvent.press(kemaskiniButton);
  expect(screen.getByText(/Nombor telefon mestilah lebih daripada 9 digit dengan atau tanpa \+6/)).toBeInTheDocument();
});

test('submits form data correctly and navigates to Success screen on success', async () => {
    render(<MaklumatProfil />);
    const kemaskiniButton = screen.getByText('Kemaskini');
  
    // Mock the axios.post function
    jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { success: true } });
  
    // Fill the form
    fireEvent.changeText(screen.getByPlaceholderText('Alamat Emel'), 'test@example.com');
    // Fill other required fields...
  
    // Click the Kemaskini button
    fireEvent.press(kemaskiniButton);
  
    // Wait for the API call to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  
    // Check if navigation to Success screen occurred
    expect(navigation.navigate).toHaveBeenCalledWith('Success', {});
  });
  
  test('shows error message on API call failure', async () => {
    render(<MaklumatProfil />);
    const kemaskiniButton = screen.getByText('Kemaskini');
  
    // Mock the axios.post function to simulate an error
    jest.spyOn(axios, 'post').mockRejectedValueOnce({});
  
    // Fill the form
    fireEvent.changeText(screen.getByPlaceholderText('Alamat Emel'), 'test@example.com');
    // Fill other required fields...
  
    // Click the Kemaskini button
    fireEvent.press(kemaskiniButton);
  
    // Wait for the API call to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  
    // Check if the error message is displayed
    expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
  });