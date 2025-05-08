<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <title>النظام المحاسبي الشامل</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        body {
            background: #f4f4f4;
        }

        .navbar {
            background: #2c3e50;
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
        }

        .dropdown {
            position: relative;
            margin: 5px;
        }

        .dropbtn {
            background: #34495e;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            font-size: 14px;
            min-width: 180px;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background: #fff;
            min-width: 200px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
            border-radius: 4px;
        }

        .dropdown-content a {
            color: #333;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            font-size: 14px;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a:hover {
            background: #ecf0f1;
        }

        .header {
            background: #1a2634;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        
        
        
        
        
        
        
        
        .sub-dropdown {
    position: relative;
    width: 100%;
}

.sub-dropdown-content {
    display: none;
    position: absolute;
    right: 100%;
    top: 0;
    background-color: #fff;
    min-width: 200px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    z-index: 2;
    border-radius: 4px;
}

.sub-dropdown:hover .sub-dropdown-content {
    display: block;
}

.sub-dropbtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.sub-dropbtn::after {
    content: '◄';
    margin-left: 10px;
    font-size: 12px;
}

/* تحسينات إضافية */
.dropdown-content a:hover {
    background-color: #f5f5f5;
}

.sub-dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    color: #333;
}

.sub-dropdown-content a:hover {
    background-color: #f5f5f5;
}

/* إضافة تأثيرات حركية */
.dropdown-content,
.sub-dropdown-content {
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
}

.dropdown:hover .dropdown-content,
.sub-dropdown:hover .sub-dropdown-content {
    opacity: 1;
    visibility: visible;
}






    </style>
</head>
<body>
    <div class="header">
        النظام المحاسبي الشامل
    </div>
    <nav class="navbar">
        <!-- المجموعة المستندية -->
        <div class="dropdown">
            <button class="dropbtn">المجموعة المستندية</button>
            <div class="dropdown-content">
                <a href="#">مستندات البيع</a>
                <a href="#">مستندات الشراء</a>
                <a href="#">مستندات المخازن</a>
                <a href="#">مستندات النقدية</a>
                <a href="#">مستندات الأجور</a>
                <a href="#">مستندات الإنتاج</a>
            </div>
        </div>

        <!-- قسم المبيعات -->
        <div class="dropdown">
            <button class="dropbtn">قسم المبيعات</button>
            <div class="dropdown-content">
                <a href="#">المبيعات النقدية</a>
                <a href="#">المبيعات الآجلة</a>
                <a href="#">مردودات المبيعات</a>
                <a href="#">خصم المبيعات</a>
                <a href="#">عمولات البيع</a>
                <a href="#">نقاط البيع</a>
                <a href="#">إدارة العملاء</a>
                <a href="#">التقارير</a>
            </div>
        </div>

        <!-- قسم المشتريات -->
        <div class="dropdown">
            <button class="dropbtn">قسم المشتريات</button>
            <div class="dropdown-content">
                <a href="#">المشتريات النقدية</a>
                <a href="#">المشتريات الآجلة</a>
                <a href="#">مردودات المشتريات</a>
                <a href="#">إدارة الموردين</a>
                <a href="#">طلبات الشراء</a>
                <a href="#">التقارير</a>
            </div>
        </div>

        <!-- قسم المخازن -->
        <div class="dropdown">
            <button class="dropbtn">قسم المخازن</button>
            <div class="dropdown-content">
                <a href="#">إدارة المخزون</a>
                <a href="#">عمليات المخازن</a>
                <a href="#">الربط مع المبيعات</a>
                <a href="#">الربط مع المشتريات</a>
                <a href="#">التقارير والتحليل</a>
            </div>
        </div>

        <!-- قسم الخدمات -->
        <div class="dropdown">
            <button class="dropbtn">قسم الخدمات</button>
            <div class="dropdown-content">
                <a href="#">خدمات الاستشارات</a>
                <a href="#">الخدمات الفنية</a>
                <a href="#">خدمات الصيانة</a>
                <a href="#">الخدمات التعليمية</a>
                <a href="#">عقود الخدمات</a>
            </div>
        </div>

        <!-- المجموعة الدفترية -->
        <div class="dropdown">
            <button class="dropbtn">المجموعة الدفترية</button>
            <div class="dropdown-content">
                <a href="#">دفتر اليومية العامة</a>
                <a href="#">دفتر الأستاذ العام</a>
                <a href="#">دفاتر الأستاذ المساعدة</a>
                <a href="#">دفاتر اليوميات المساعدة</a>
                <a href="#">سجلات إحصائية</a>
            </div>
        </div>

        <!-- الدليل المحاسبي -->
        <div class="dropdown">
            <button class="dropbtn">الدليل المحاسبي</button>
            <div class="dropdown-content">
                <a href="#">حسابات الميزانية</a>
                <a href="#">حسابات النتيجة</a>
                <a href="#">الحسابات الإحصائية</a>
                <a href="#">الحسابات النظامية</a>
            </div>
        </div>

        <!-- التقارير المالية -->
        <div class="dropdown">
            <button class="dropbtn">التقارير المالية</button>
            <div class="dropdown-content">
                <a href="#">الميزانية العمومية</a>
                <a href="#">قائمة الدخل</a>
                <a href="#">قائمة التدفقات النقدية</a>
                <a href="#">قائمة التغيرات في حقوق الملكية</a>
                <a href="#">التقارير التحليلية</a>
            </div>
        </div>

        <!-- السياسات المحاسبية -->
        <div class="dropdown">
            <button class="dropbtn">السياسات المحاسبية</button>
            <div class="dropdown-content">
                <a href="#">سياسات التقييم</a>
                <a href="#">سياسات الإهلاك</a>
                <a href="#">سياسات المخزون</a>
                <a href="#">سياسات الاعتراف بالإيراد</a>
            </div>
        </div>

        <!-- الإجراءات المحاسبية -->
        <div class="dropdown">
            <button class="dropbtn">الإجراءات المحاسبية</button>
            <div class="dropdown-content">
                <a href="#">دورة المشتريات</a>
                <a href="#">دورة المبيعات</a>
                <a href="#">دورة الرواتب</a>
                <a href="#">دورة الإنتاج</a>
                <a href="#">دورة النقدية</a>
            </div>
        </div>

        <!-- الرقابة الداخلية -->
        <div class="dropdown">
            <button class="dropbtn">الرقابة الداخلية</button>
            <div class="dropdown-content">
                <a href="#">إجراءات الضبط الداخلي</a>
                <a href="#">نظام التدقيق الداخلي</a>
                <a href="#">الفصل بين المهام</a>
                <a href="#">صلاحيات الموافقة</a>
            </div>
        </div>

        <!-- النظام المحاسبي الآلي -->
        <div class="dropdown">
            <button class="dropbtn">النظام المحاسبي الآلي</button>
            <div class="dropdown-content">
                <a href="#">البرامج المحاسبية</a>
                <a href="#">قواعد البيانات</a>
                <a href="#">أنظمة الأمان</a>
                <a href="#">النسخ الاحتياطي</a>
            </div>
        </div>

        <!-- نظام التكاليف -->
        <div class="dropdown">
            <button class="dropbtn">نظام التكاليف</button>
            <div class="dropdown-content">
                <a href="#">تكاليف المواد المباشرة</a>
                <a href="#">تكاليف العمالة المباشرة</a>
                <a href="#">التكاليف الصناعية غير المباشرة</a>
                <a href="#">تكاليف المراحل الإنتاجية</a>
                <a href="#">تحليل الانحرافات</a>
                <a href="#">الموازنات التقديرية</a>
            </div>
        </div>

        <!-- إدارة الموارد البشرية -->
        <div class="dropdown">
            <button class="dropbtn">الموارد البشرية</button>
            <div class="dropdown-content">
                <a href="#">ملفات الموظفين</a>
                <a href="#">الرواتب والأجور</a>
                <a href="#">العمل الإضافي</a>
                <a href="#">البدلات والحوافز</a>
                <a href="#">الإجازات والغياب</a>
                <a href="#">التأمينات الاجتماعية</a>
                <a href="#">نهاية الخدمة</a>
            </div>
        </div>

        <!-- الإدارة المالية -->
        <div class="dropdown">
            <button class="dropbtn">الإدارة المالية</button>
            <div class="dropdown-content">
                <a href="#">إدارة النقدية</a>
                <a href="#">إدارة الاستثمارات</a>
                <a href="#">التخطيط المالي</a>
                <a href="#">الموازنات التقديرية</a>
                <a href="#">التدفقات النقدية</a>
                <a href="#">القروض والتسهيلات</a>
            </div>
        </div>

        <!-- نظام الضرائب والزكاة -->
        <div class="dropdown">
            <button class="dropbtn">الضرائب والزكاة</button>
            <div class="dropdown-content">
                <a href="#">حسابات الزكاة</a>
                <a href="#">ضريبة القيمة المضافة</a>
                <a href="#">ضريبة الدخل</a>
                <a href="#">الإقرارات الضريبية</a>
                <a href="#">التسويات الضريبية</a>
            </div>
        </div>

        <!-- نظام الفروع -->
        <div class="dropdown">
            <button class="dropbtn">نظام الفروع</button>
            <div class="dropdown-content">
                <a href="#">محاسبة الفروع</a>
                <a href="#">التحويلات بين الفروع</a>
                <a href="#">توحيد الحسابات</a>
                <a href="#">تقارير الفروع</a>
                <a href="#">مراقبة أداء الفروع</a>
            </div>
        </div>

        <!-- نظام العملات الأجنبية -->
        <div class="dropdown">
            <button class="dropbtn">العملات الأجنبية</button>
            <div class="dropdown-content">
                <a href="#">تحويل العملات</a>
                <a href="#">فروقات العملة</a>
                <a href="#">أسعار الصرف</a>
                <a href="#">تقييم الأرصدة</a>
            </div>
        </div>

        <!-- التقارير المتخصصة -->
        <div class="dropdown">
            <button class="dropbtn">التقارير المتخصصة</button>
            <div class="dropdown-content">
                <a href="#">تقارير الإدارة العليا</a>
                <a href="#">تقارير مجلس الإدارة</a>
                <a href="#">التقارير القطاعية</a>
                <a href="#">تقارير المساهمين</a>
                <a href="#">التقارير الحكومية</a>
            </div>
        </div>

        <!-- نظام الحوكمة والامتثال -->
        <div class="dropdown">
            <button class="dropbtn">الحوكمة والامتثال</button>
            <div class="dropdown-content">
                <a href="#">السياسات والإجراءات</a>
                <a href="#">الرقابة الداخلية</a>
                <a href="#">إدارة المخاطر</a>
                <a href="#">الامتثال للقوانين</a>
                <a href="#">حوكمة الشركات</a>
            </div>
        </div>

        <!-- نظام إدارة الأصول الثابتة -->
        <div class="dropdown">
            <button class="dropbtn">الأصول الثابتة</button>
            <div class="dropdown-content">
                <a href="#">سجل الأصول</a>
                <a href="#">حساب الإهلاك</a>
                <a href="#">صيانة الأصول</a>
                <a href="#">استبعاد الأصول</a>
                <a href="#">إعادة التقييم</a>
            </div>
        </div>

        <!-- نظام إدارة العقود -->
        <div class="dropdown">
            <button class="dropbtn">إدارة العقود</button>
            <div class="dropdown-content">
                <a href="#">عقود العملاء</a>
                <a href="#">عقود الموردين</a>
                <a href="#">عقود الإيجار</a>
                <a href="#">عقود الصيانة</a>
                <a href="#">متابعة الالتزامات</a>
            </div>
        </div>

        <!-- نظام إدارة المعرفة -->
        <div class="dropdown">
            <button class="dropbtn">إدارة المعرفة</button>
            <div class="dropdown-content">
                <a href="#">توثيق السياسات</a>
                <a href="#">أدلة المستخدم</a>
                <a href="#">الأرشفة الإلكترونية</a>
                <a href="#">حفظ المستندات</a>
                <a href="#">إدارة الوثائق</a>
            </div>
        </div>



        <!-- نظام أمن المعلومات -->
        <div class="dropdown">
            <button class="dropbtn">أمن المعلومات</button>
            <div class="dropdown-content">
                <a href="#">صلاحيات المستخدمين</a>
                <a href="#">حماية البيانات</a>
                <a href="#">النسخ الاحتياطي</a>
                <a href="#">استعادة البيانات</a>
                <a href="#">سجل العمليات</a>
            </div>
        </div>
<!-- التكامل بين الأقسام -->
<div class="dropdown">
    <button class="dropbtn">التكامل بين الأقسام</button>
    <div class="dropdown-content">
        <a href="#">تكامل المخازن مع المبيعات</a>
        <a href="#">تكامل المخازن مع المشتريات</a>
        <a href="#">تكامل المخازن مع المحاسبة</a>
        <a href="#">تكامل المخازن مع التكاليف</a>
        <a href="#">التقارير المتكاملة</a>
    </div>
</div>

<!-- الرقابة على المخزون -->
<div class="dropdown">
    <button class="dropbtn">الرقابة على المخزون</button>
    <div class="dropdown-content">
        <a href="#">الجرد الدوري</a>
        <a href="#">الجرد المستمر</a>
        <a href="#">مطابقة الأرصدة</a>
        <a href="#">معالجة الفروقات</a>
        <a href="#">تقارير الرقابة</a>
    </div>
</div>


<!-- إضافة القسم الجديد للقوائم السابقة -->
<div class="dropdown">
    <button class="dropbtn">إدارة قواعد البيانات</button>
    <div class="dropdown-content">
        <!-- النسخ الاحتياطي -->
        <div class="sub-dropdown">
            <a href="#" class="sub-dropbtn">النسخ الاحتياطي</a>
            <div class="sub-dropdown-content">
                <a href="#">نسخ احتياطي كامل</a>
                <a href="#">نسخ احتياطي تزايدي</a>
                <a href="#">نسخ احتياطي تفاضلي</a>
                <a href="#">جدولة النسخ الاحتياطي</a>
                <a href="#">سجل النسخ الاحتياطي</a>
            </div>
        </div>

        <!-- استرجاع البيانات -->
        <div class="sub-dropdown">
            <a href="#" class="sub-dropbtn">استرجاع البيانات</a>
            <div class="sub-dropdown-content">
                <a href="#">استرجاع كامل</a>
                <a href="#">استرجاع جزئي</a>
                <a href="#">استرجاع لنقطة زمنية</a>
                <a href="#">سجل الاسترجاع</a>
            </div>
        </div>

        <!-- استيراد وتصدير -->
        <div class="sub-dropdown">
            <a href="#" class="sub-dropbtn">استيراد/تصدير</a>
            <div class="sub-dropdown-content">
                <a href="#">استيراد من Excel</a>
                <a href="#">استيراد من CSV</a>
                <a href="#">استيراد من XML</a>
                <a href="#">تصدير إلى Excel</a>
                <a href="#">تصدير إلى CSV</a>
                <a href="#">تصدير إلى XML</a>
            </div>
        </div>

        <!-- إدارة البيانات -->
        <div class="sub-dropdown">
            <a href="#" class="sub-dropbtn">إدارة البيانات</a>
            <div class="sub-dropdown-content">
                <a href="#">تنظيف البيانات</a>
                <a href="#">ضغط البيانات</a>
                <a href="#">إصلاح قواعد البيانات</a>
                <a href="#">تحسين الأداء</a>
            </div>
        </div>
    </div>
</div>





    </nav>
    
    
    
    
    
    
    
    
    <script>
    
    

// إضافة هذا الكود JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // وظائف النسخ الاحتياطي
    function createBackup(type) {
        const backupTypes = {
            'full': 'BACKUP DATABASE [DatabaseName] TO DISK = @path WITH INIT',
            'differential': 'BACKUP DATABASE [DatabaseName] TO DISK = @path WITH DIFFERENTIAL',
            'incremental': 'BACKUP LOG [DatabaseName] TO DISK = @path'
        };
        
        // تنفيذ النسخ الاحتياطي
        console.log(`Executing ${type} backup...`);
    }

    // وظائف الاسترجاع
    function restoreDatabase(type, path) {
        const restoreTypes = {
            'full': 'RESTORE DATABASE [DatabaseName] FROM DISK = @path WITH REPLACE',
            'point-in-time': 'RESTORE DATABASE [DatabaseName] FROM DISK = @path WITH STOPAT = @time'
        };
        
        // تنفيذ الاسترجاع
        console.log(`Restoring database from ${path}...`);
    }

    // وظائف الاستيراد والتصدير
    function importData(format, file) {
        // التحقق من صحة الملف
        // تحليل البيانات
        // إدخال البيانات إلى قاعدة البيانات
        console.log(`Importing data from ${file}...`);
    }

    function exportData(format, table) {
        // استخراج البيانات
        // تحويل البيانات إلى التنسيق المطلوب
        // حفظ الملف
        console.log(`Exporting ${table} to ${format}...`);
    }

    // وظائف إدارة البيانات
    function optimizeDatabase() {
        // تنظيف البيانات
        // إعادة بناء الفهارس
        // تحديث الإحصائيات
        console.log('Optimizing database...');
    }

    // إضافة مستمعي الأحداث
    document.querySelectorAll('.sub-dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent;
            
            switch(action) {
                case 'نسخ احتياطي كامل':
                    createBackup('full');
                    break;
                case 'استرجاع كامل':
                    restoreDatabase('full');
                    break;
                case 'استيراد من Excel':
                    importData('excel');
                    break;
                case 'تحسين الأداء':
                    optimizeDatabase();
                    break;
                // إضافة المزيد من الحالات حسب الحاجة
            }
        });
    });
});



    
    
    
    
    
    
    
    
    
    </script>
</body>
</html>
