import AuthGuard from '@/app/components/AuthGuard'
import DashboardHeader from '@/app/components/DashboardHeader'
import DashboardLayout from '@/app/components/Layouts/DashboardLayout'
import PasswordChange from '@/app/components/PasswordChange'
import { Box } from '@mui/material'
import React from 'react'

function DashboardPasswordChangePage() {
    return (
        <AuthGuard>
            <DashboardLayout>
                <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <DashboardHeader title="Change Password" />
                    <PasswordChange />
                </Box>
            </DashboardLayout>
        </AuthGuard>
    )
}

export default DashboardPasswordChangePage
