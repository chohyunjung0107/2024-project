import { NextRequest, NextResponse } from "next/server";
import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.getConnection((err, conn) => {
  if (err) console.log("db 연결 에러");
  else console.log("db 연결됨");
  conn.release();
});

/**
 * get 조회
 */
export async function GET(req) {
  try {
    // 데이터베이스에서 데이터를 쿼리
    const [rows] = await pool.query("select * from testdb.testdb");
    // 쿼리 결과를 JSON 형태로 반환

    const response = NextResponse.json(rows);
    response.headers.set("Access-Control-Allow-Origin", "*"); // 필요에 따라 Origin을 설정
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (err) {
    console.error("Database query error", err);
    // 오류 발생 시 에러 메시지와 함께 500 상태 코드 반환
    // return NextResponse.json(
    //   { error: "Database query error" },
    //   { status: 500 }
    // );
    const response = NextResponse.json(
      { error: "Database query error" },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*"); // 필요에 따라 Origin을 설정
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  } //(*try-catch)
}

/**
 * post 수정
 */

export async function POST(req) {
  const requestBody = await req.json();
  console.log("Requst body", requestBody);

  const { name } = requestBody; // JSON 요청 본문에서 데이터를 추출
  const [result] = await pool.query(
    `update test.test_table set name=? where id=2`,
    [name]
  );

  return NextResponse.json({
    message: "Data updated successfully",
    affectedRows: result.affectedRows, // UPDATE 쿼리의 경우 변경된 행 수 반환
  });
}

/**
 * <update id="updateEqUseYn" parameterType="EqUpdateDto"> 
   		UPDATE MD_EQ
    		SET USE_YN = #{useYn},
    			UPDATE_DATE = GETDATE()
   		WHERE DEVICE_CODE = #{deviceCode}
   		AND EQ_CODE = #{eqCode}
   		AND EQ_TYPE != 'CELL'
	</update>

 */
