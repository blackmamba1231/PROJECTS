import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(null); // To show success/error messages
    const navigate = useNavigate();

    const handleTransfer = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Authorization token not found");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: localStorage.getItem('userid')
                }
            });
            console.log(response.data);
            setMessage("Transfer successful");
            // Navigate back to dashboard after a delay
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error('Error during transfer:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(`Transfer failed: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage("Transfer failed: No response from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage(`Transfer failed: ${error.message}`);
            }
        }
    }

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            {message && <p className="text-center mt-4">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
