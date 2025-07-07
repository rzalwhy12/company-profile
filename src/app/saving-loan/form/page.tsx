// src/components/Form.tsx
"use client";

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation'; // Import useRouter

// Import UI components from shadcn/ui
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// =========================================================================
// 1. Validation Schema with Zod
// =========================================================================

const formSchema = z.object({
    name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number must not exceed 15 digits." }),
    purpose: z.enum(['saving', 'loan'], { message: "Please select a purpose." }),
    // Conditional fields
    savingAmount: z.string().optional(),
    loanAmount: z.string().optional(),
    loanPurpose: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// =========================================================================
// 2. Main Form Component
// =========================================================================

const CustomerEnquiryForm: React.FC = () => {
    const router = useRouter(); // Initialize useRouter
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            purpose: 'saving', // Default value
            name: '',
            email: '',
            phone: '',
            savingAmount: '',
            loanAmount: '',
            loanPurpose: '',
        }
    });

    const purpose = watch('purpose');

    useEffect(() => {
        if (purpose === 'saving') {
            setValue('loanAmount', '');
            setValue('loanPurpose', '');
        } else {
            setValue('savingAmount', '');
        }
    }, [purpose, setValue]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
    const emailTo = 'your@email.com'; // Ganti dengan email tujuan

    const cleanedSaving = data.savingAmount?.replace(/\./g, '');
    const cleanedLoan = data.loanAmount?.replace(/\./g, '');

    const subject = encodeURIComponent('Customer Enquiry Form Submission');

    const body = encodeURIComponent(
        `New customer enquiry:\n\n` +
        `Full Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Purpose: ${data.purpose === 'saving' ? 'Saving' : 'Loan'}\n\n` +
        (data.purpose === 'saving'
            ? `Desired Savings Amount: Rp ${cleanedSaving}`
            : `Desired Loan Amount: Rp ${cleanedLoan}\nPurpose of Loan: ${data.loanPurpose}`
        )
    );

    const mailtoURL = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    window.location.href = mailtoURL;
};

    // Function to format number input with thousands separator as user types
    const formatNumberInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const rawValue = value.replace(/\./g, ''); // Remove all dots
        if (!isNaN(Number(rawValue))) {
            const formattedValue = new Intl.NumberFormat('id-ID').format(Number(rawValue));
            // Use setValue to update the value in react-hook-form
            setValue(name as keyof FormData, formattedValue, { shouldValidate: true });
        } else {
            setValue(name as keyof FormData, rawValue, { shouldValidate: true });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-blue-950">
            {/* Left Section: Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center">
                {/* Menambahkan min-h-[min(content,80vh)] untuk memastikan ada cukup ruang */}
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-100 p-8 sm:p-10 relative min-h-[min(content,80vh)] mt-8">
                    {/* Back to Home Button */}
                    <div className="absolute top-4 left-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/')} // Navigate to home page
                            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Button>
                    </div>

                    <div className="mb-8 text-center lg:text-left mt-8"> {/* Adjusted margin-top to avoid overlap with button */}
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Customer Data Form
                        </h1>
                        <p className="text-gray-600">
                            Please fill out the form below to start your financial journey.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <Label htmlFor="name" className="text-gray-700 font-medium text-sm mb-1 block">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Full Name"
                                {...register('name')}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-gray-700 font-medium text-sm mb-1 block">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <Label htmlFor="phone" className="text-gray-700 font-medium text-sm mb-1 block">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Example: +6281234567890"
                                {...register('phone')}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Purpose (Saving/Loan) */}
                        <div>
                            <Label htmlFor="purpose" className="text-gray-700 font-medium text-sm mb-1 block">Purpose</Label>
                            <Select
                                onValueChange={(value: 'saving' | 'loan') => setValue('purpose', value, { shouldValidate: true })}
                                defaultValue={purpose}
                            >
                                <SelectTrigger className=" w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm">
                                    <SelectValue placeholder="Select Your Purpose" />
                                </SelectTrigger>
                                {/* Meningkatkan z-index pada SelectContent */}
                                <SelectContent position="popper" sideOffset={5} className="z-[9999] bg-white/20 backdrop-blur-sm pb-4">
                                    <SelectItem value="saving">Savings / Deposit</SelectItem>
                                    <SelectItem value="loan">Loan / Credit</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
                        </div>

                        {/* Conditional fields for Saving */}
                        {purpose === 'saving' && (
                            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                                <Label htmlFor="savingAmount" className="text-blue-700 font-semibold text-sm mb-1 block">Desired Savings Amount (IDR)</Label>
                                <Input
                                    id="savingAmount"
                                    type="text"
                                    placeholder="e.g., 5,000,000"
                                    {...register('savingAmount', {
                                        validate: (value) => {
                                            if (purpose === 'saving' && (!value || value.trim() === '')) return 'Saving amount is required.';
                                            if (value && isNaN(Number(value.replace(/\./g, '')))) return 'Please enter a valid number.';
                                            return true;
                                        }
                                    })}
                                    onBlur={formatNumberInput}
                                    onChange={formatNumberInput}
                                    value={watch('savingAmount')}
                                    className="w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
                                />
                                {errors.savingAmount && <p className="text-red-500 text-xs mt-1">{errors.savingAmount.message}</p>}
                            </div>
                        )}

                        {/* Conditional fields for Loan */}
                        {purpose === 'loan' && (
                            <div className="bg-orange-50 p-4 rounded-md border border-orange-200">
                                <Label htmlFor="loanAmount" className="text-orange-700 font-semibold text-sm mb-1 block">Desired Loan Amount (IDR)</Label>
                                <Input
                                    id="loanAmount"
                                    type="text"
                                    placeholder="e.g., 50,000,000"
                                    {...register('loanAmount', {
                                        validate: (value) => {
                                            if (purpose === 'loan' && (!value || value.trim() === '')) return 'Loan amount is required.';
                                            if (value && isNaN(Number(value.replace(/\./g, '')))) return 'Please enter a valid number.';
                                            return true;
                                        }
                                    })}
                                    onBlur={formatNumberInput}
                                    onChange={formatNumberInput}
                                    value={watch('loanAmount')}
                                    className="w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 text-sm"
                                />
                                {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}

                                <div className="mt-4">
                                    <Label htmlFor="loanPurpose" className="text-orange-700 font-semibold text-sm mb-1 block">Purpose of Loan</Label>
                                    <Textarea
                                        id="loanPurpose"
                                        placeholder="e.g., Business expansion, house renovation, education"
                                        {...register('loanPurpose', {
                                            validate: (value) => {
                                                if (purpose === 'loan' && (!value || value.trim() === '')) return 'Loan purpose is required.';
                                                return true;
                                            }
                                        })}
                                        className="w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 text-sm"
                                        rows={3}
                                    />
                                    {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose.message}</p>}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                        </Button>

                        {isSubmitSuccessful && (
                            <p className="text-green-600 text-center text-sm mt-4">
                                Your enquiry has been successfully sent!
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Right Section: Visual/Text Content */}
            <div
                className="hidden lg:flex w-full lg:w-1/2 bg-gray-200 relative items-center justify-center pt-8 pr-8 pl-8 overflow-hidden"
                style={{
                    backgroundImage: "url('/image/buka-simpanan.jpg')", // Replace with your image path
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 z-10"></div>
                <div className="relative z-20 text-white text-center p-6 max-w-xl mx-auto">
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className="text-lg font-bold">⭐ 2023 &quot;Best Bank&quot; Award</span>
                        <span className="text-lg font-bold">🏆 Top Financial Services</span>
                    </div>

                    <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                        Achieve Your <span className="text-orange-300">Financial Dreams</span> With Us
                    </h2>
                    <p className="text-lg text-white/90 mb-6">
                        We believe in empowering our customers with the best, transparent, and trusted financial solutions.
                    </p>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg inline-block text-sm text-white font-medium">
                        <p className="mb-2">
                            We are your trusted financial partner.
                        </p>
                        <p>
                            Receive excellent service and personalized solutions for all your needs.
                        </p>
                    </div>

                    <div className="mt-10">
                        <p className="text-white/80 font-semibold text-xl">
                            Our Financial Experts Team
                        </p>
                        <p className="text-white/60 text-sm">
                            Ready to Serve You
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerEnquiryForm;