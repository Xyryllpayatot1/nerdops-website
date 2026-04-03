import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured', leads: [] }, { status: 503 });
    }

    const sql = neon(process.env.DATABASE_URL);
    const leads = await sql`
      SELECT * FROM leads ORDER BY created_at DESC
    `;
    return Response.json(leads);
  } catch (error) {
    console.warn('Database unavailable:', error.message);
    return Response.json({ error: 'Database unavailable', leads: [] }, { status: 503 });
  }
}

export async function POST(request) {
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 503 });
    }

    const sql = neon(process.env.DATABASE_URL);
    const body = await request.json();
    
    const {
      formType,
      name,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      teamSize,
      zipCode,
      mainIssue,
      computerType,
      deviceType,
      workLocation,
      startTime,
      message,
      securityConcerns,
      hasSecurityTeam,
      sensitiveDataAccess,
      securityIncidents,
      complianceRequirements,
    } = body;

    const lead = await sql`
      INSERT INTO leads (
        form_type,
        name,
        first_name,
        last_name,
        email,
        phone,
        company_name,
        team_size,
        zip_code,
        main_issue,
        computer_type,
        device_type,
        work_location,
        start_time,
        message,
        security_concerns,
        has_security_team,
        sensitive_data_access,
        security_incidents,
        compliance_requirements,
        created_at
      ) VALUES (
        ${formType},
        ${name || null},
        ${firstName || null},
        ${lastName || null},
        ${email || null},
        ${phone || null},
        ${companyName || null},
        ${teamSize || null},
        ${zipCode || null},
        ${mainIssue || null},
        ${computerType || null},
        ${deviceType || null},
        ${workLocation || null},
        ${startTime || null},
        ${message || null},
        ${securityConcerns || null},
        ${hasSecurityTeam || null},
        ${sensitiveDataAccess || null},
        ${securityIncidents || null},
        ${complianceRequirements || null},
        NOW()
      )
      RETURNING *
    `;

    return Response.json(lead[0], { status: 201 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return Response.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'Lead ID required' }, { status: 400 });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 503 });
    }

    const sql = neon(process.env.DATABASE_URL);
    await sql`DELETE FROM leads WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return Response.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
